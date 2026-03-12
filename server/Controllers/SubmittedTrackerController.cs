using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos.SubmittedTracker;
using server.Repos;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SubmittedTrackerController(SubmittedTrackerRepo _submittedRepo) : ControllerBase
{
    [HttpGet("{trackerId}")]
    public async Task<IActionResult> Get(
        string trackerId,
        [FromQuery] DateTime from,
        [FromQuery] DateTime to)
    {
        if (from > to)
            return BadRequest("'from' date must be earlier than 'to' date.");

        var results = await _submittedRepo.GetAllByTrackerIdAndDateRange(trackerId, from, to);

        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateSubmittedTrackerDto value)
    {
        var submitted = await _submittedRepo.CreateAsync(value);
        return Ok(submitted);
    }
}
