using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Tracker;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TrackerController(
        ApplicationDbContext _context,
        ICurrentUserService _currentUserService
    ) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var trackers = await _context.Trackers.Include(t => t.User).ToListAsync();
            var dtos = trackers.Select(t => new { t.Id, t.Name, t.Description, t.CreatedAt });

            return Ok(dtos);
        }

        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateTrackerDto value)
        {
            var tracker = new Tracker
            {
                Name = value.Name,
                Description = value.Description,
                UserEmail = _currentUserService.Email,
                CreatedAt = DateTime.Now,
            };

            await _context.Trackers.AddAsync(tracker);
            await _context.SaveChangesAsync();

            return Ok();
        }

        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
