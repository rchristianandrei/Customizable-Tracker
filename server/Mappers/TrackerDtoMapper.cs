using server.Dtos.Component;
using server.Dtos.Tracker;
using server.Models.MongoDb;

namespace server.Mappers;

public static class TrackerDtoMapper
{
    public static TrackerDto ToDto(this Tracker tracker, bool includeComponents = false)
    {
        ICollection<TextboxDto> dtos = [];
        if (includeComponents) dtos = [.. tracker.Components.Select(c => c.ToDto())];

        return new TrackerDto
        {
            Id = tracker.Id!,
            Name = tracker.Name,
            Description = tracker.Description,
            Deploy = tracker.Deploy,
            Components = dtos,
            CreatedAt = tracker.CreatedAt
        };
    }
}
