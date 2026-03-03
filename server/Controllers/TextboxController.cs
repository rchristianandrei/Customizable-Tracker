using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Component;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TextboxController(
    ApplicationDbContext _context, 
    ICurrentUserService _currentUserService
    ) : ControllerBase
{
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateComponentDto dto)
    {
        var tracker = await _context.Trackers.Include(t => t.Components).FirstOrDefaultAsync((t) => t.Id == dto.TrackerId);
        if (tracker == null) return NotFound();
        if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();

        var texbox = new TextboxComponent{
            Label = "Textbox",
            Placeholder = "Placeholder",
            Order = tracker.Components.Count + 1, 
            CreatedAt = DateTime.Now
        };

        tracker.Components.Add(texbox);

        await _context.SaveChangesAsync();

        return Ok(texbox.ToDto());
    }

    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}
}
