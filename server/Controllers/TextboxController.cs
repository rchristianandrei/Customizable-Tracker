using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Component;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Repos;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TextboxController(
    ApplicationDbContext _context, 
    ICurrentUserService _currentUserService,
    TrackerRepo _trackerRepo
    ) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateComponentDto dto)
    {
        var tracker = await _trackerRepo.GetById(dto.TrackerId);
        if (tracker == null) return NotFound();
        if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();

        var texbox = new Models.MongoDb.TextboxComponent
        {
            Label = "Textbox",
            Placeholder = "Placeholder",
            Order = tracker.Components.Count + 1
        };

        tracker.Components.Add(texbox);

        await _trackerRepo.Update(tracker);

        return Ok(texbox);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateTextboxDto value)
    {
        var textbox = await _context.TextboxComponents.FindAsync(id);
        if (textbox == null) return NotFound();

        textbox.Label = value.Label;
        textbox.Placeholder = value.Placeholder;
        textbox.Required = value.Required;
        textbox.MaxLength = value.MaxLength;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var textbox = await _context.TextboxComponents.FindAsync(id);

        if (textbox == null) return NotFound();

        _context.TextboxComponents.Remove(textbox);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
