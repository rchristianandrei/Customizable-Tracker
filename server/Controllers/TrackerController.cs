using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Dtos.Tracker;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TrackerController(
        ApplicationDbContext _context,
        ICurrentUserService _currentUserService,
        TextboxService _textboxService
    ) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginatedQueryParameters dto)
        {
            var query = _context.Trackers.AsQueryable();

            if(dto.Query != null) query = query.Where(t => (t.Name.Contains(dto.Query) || t.Description.Contains(dto.Query) && t.UserEmail == _currentUserService.Email));

            var totalCount = await query.CountAsync();
            var trackers = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((dto.PageOrDefault - 1) * dto.PageSizeOrDefault)
                .Take(dto.PageSizeOrDefault)
                .ToListAsync();
            var dtos = trackers.Select(t => t.ToDto());

            return Ok(new {
                totalCount,
                page = dto.PageOrDefault,
                pageSize =  dto.PageSizeOrDefault,
                totalPages = (int)Math.Ceiling(totalCount / (double)dto.PageSizeOrDefault),
                data = dtos
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var tracker = await _context.Trackers
                .Include(t => t.Components)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tracker == null) return NotFound();
            if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();

            tracker.Components = [.. tracker.Components.OrderBy(c => c.Order)];

            return Ok(tracker.ToDto());
        }

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

            return Ok(tracker.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateTrackerDto dto)
        {
            var tracker = await _context.Trackers.Include(c => c.Components).FirstOrDefaultAsync(t => t.Id == id);

            if (tracker == null) return NotFound();
            if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();

            tracker.Name = dto.Name;
            tracker.Description = dto.Description;

            for(var i = 0; i < dto.Components.Count; i++)
            {
                var cDto = dto.Components[i];
                var component = tracker.Components.FirstOrDefault(c => c.Id == cDto.Id);
                if(component == null) continue;
                _textboxService.Update(cDto, i, component);
            }

            await _context.SaveChangesAsync();

            return Ok(tracker.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tracker = await _context.Trackers.FindAsync(id);

            if (tracker == null) return NotFound();

            _context.Trackers.Remove(tracker);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
