using server.Dtos.Component;
using server.Dtos.Tracker;

namespace server.Mappers;

public static class TrackerDtoMapper
{
    public static TrackerDto ToDto(this Models.MongoDb.Tracker tracker, bool includeComponents = false)
    {
        ICollection<TextboxDto> components = [];
        if (includeComponents) components = [.. tracker.Components.Select(c => c.ToDto())];

        return new TrackerDto
        {
            Id = tracker.Id!,
            Name = tracker.Name,
            Description = tracker.Description,
            Components = components,
            CreatedAt = tracker.CreatedAt
        };
    }
}
