using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Dtos;
using server.Dtos.Tracker;
using server.Interfaces;
using server.Mappers;
using server.Models.MongoDb;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TrackerController(
        ICurrentUserService _currentUserService,
        ITrackerRepo _trackerRepo
    ) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginatedQueryParameters dto, [FromQuery] bool isDeployed = false)
        {
            var builder = Builders<Tracker>.Filter;
            var userFilter = builder.Eq(t => t.UserEmail, _currentUserService.Email);
            var searchFilter = builder.Empty;
            var isDeployedFilter = builder.Empty;

            if (!string.IsNullOrWhiteSpace(dto.Query))
            {
                var nameFilter = builder.Regex(t => t.Name, new BsonRegularExpression(dto.Query, "i"));
                var descFilter = builder.Regex(t => t.Description, new BsonRegularExpression(dto.Query, "i"));
                searchFilter = builder.Or(nameFilter, descFilter);
            }

            if (isDeployed)
            {
                isDeployedFilter = builder.Eq(t => t.Deploy, isDeployed);
            }

            var combinedFilter = builder.And(userFilter, searchFilter, isDeployedFilter);

            var trackers = await _trackerRepo.GetAll(combinedFilter, dto);
            var totalCount = (await _trackerRepo.GetAll(combinedFilter)).Count();
            var dtos = trackers.Select(t => t.ToDto());

            return Ok(new
            {
                totalCount,
                page = dto.PageOrDefault,
                pageSize = dto.PageSizeOrDefault,
                totalPages = (int)Math.Ceiling(totalCount / (double)dto.PageSizeOrDefault),
                data = dtos
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id, [FromQuery] bool isDeployed = false)
        {
            var tracker = await _trackerRepo.GetById(id);

            if (tracker == null) return NotFound();
            if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();
            if(isDeployed && !tracker.Deploy) return BadRequest("Tracker is not deployed");

            tracker.Components = [.. tracker.Components.OrderBy(c => c.Order)];

            return Ok(tracker.ToDto(includeComponents: true));
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

            await _trackerRepo.Create(tracker);

            return Ok(tracker.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] UpdateTrackerDto dto)
        {
            var tracker = await _trackerRepo.GetById(id);

            if (tracker == null) return NotFound();
            if (tracker.UserEmail != _currentUserService.Email) return Unauthorized();

            tracker.Name = dto.Name;
            tracker.Description = dto.Description;
            tracker.LastUpdated = DateTime.UtcNow;
            tracker.Deploy = dto.Deploy;

            int orderIndex = 0;
            var components = dto.Components.Select(c =>
            {
                return new TextboxComponent
                {
                    Id = c.Id,
                    Label = c.Label,
                    Placeholder = c.Placeholder,
                    Required = c.Required,
                    Order = orderIndex + 1,
                    DependsOnId = c.DependsOnId,
                    MaxLength = c.MaxLength
                };
            }).ToList();

            tracker.Components = components;

            await _trackerRepo.Update(tracker);

            return Ok(tracker.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var tracker = await _trackerRepo.GetById(id);

            if (tracker == null) return NotFound();

            await _trackerRepo.DeleteById(id);

            return NoContent();
        }
    }
}
