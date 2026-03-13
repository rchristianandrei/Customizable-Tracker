using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.SubmittedTracker;
using server.Interfaces;
using server.Models.MongoDb;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SubmittedTrackerController(ISubmittedTrackerRepo _submittedRepo) : ControllerBase
{
    [HttpGet("{trackerId}")]
    public async Task<IActionResult> Get(
        string trackerId,
        [FromQuery] DateTime? from = null,
        [FromQuery] DateTime? to = null)
    {
        var today = DateTime.Today;
        var resolvedFrom = from ?? today;
        var resolvedTo = to ?? today.AddDays(1).AddTicks(-1);

        if (resolvedFrom > resolvedTo)
            return BadRequest("'from' date must be earlier than 'to' date.");

        var results = await _submittedRepo.GetAllByTrackerIdAndDateRange(trackerId, resolvedFrom, resolvedTo);

        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateSubmittedTrackerDto value)
    {
        var tracker = new SubmittedTracker
        {
            TrackerId = value.TrackerId,
            TrackerName = value.TrackerName,
            Components = value.Components
        };
        await _submittedRepo.Create(tracker);
        return Ok(tracker);
    }
}
