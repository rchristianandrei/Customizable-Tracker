using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.SubmittedTracker;
using server.Interfaces;
using server.Models.MongoDb;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SubmittedTrackerController(
    ITrackerRepo _trackerRepo,
    ISubmittedTrackerRepo _submittedRepo
    ) : ControllerBase
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
        var tracker = await _trackerRepo.GetById(value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        foreach(var comp in value.Components)
        {
            var component = tracker.Components.FirstOrDefault(c => c.Id == comp.Id);
            if (component == null) continue;
            if (component.Required && String.IsNullOrWhiteSpace(comp.EncodedData)) return BadRequest("Empty Field");
        }

        var submit = new SubmittedTracker
        {
            TrackerId = value.TrackerId,
            TrackerName = value.TrackerName,
            Components = value.Components
        };
        await _submittedRepo.Create(submit);
        return Ok(submit);
    }
}
