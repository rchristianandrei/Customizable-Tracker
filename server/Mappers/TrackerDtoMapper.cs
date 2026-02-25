using server.Dtos.Tracker;
using server.Models;

namespace server.Mappers;

public static class TrackerDtoMapper
{
    public static TrackerDto ToDto(this Tracker tracker)
    {
        return new TrackerDto
        {
            Id = tracker.Id,
            Name = tracker.Name,
            Description = tracker.Description,
            CreatedAt = tracker.CreatedAt
        };
    }
}
