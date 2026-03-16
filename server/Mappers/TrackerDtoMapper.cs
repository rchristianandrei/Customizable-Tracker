using server.Dtos.Component;
using server.Dtos.Tracker;
using server.Models.MongoDb;

namespace server.Mappers;

public static class TrackerDtoMapper
{
    public static TrackerDto ToDto(this Tracker tracker, bool includeComponents = false)
    {
        var map = new Dictionary<string, TextboxDto>();
        if (includeComponents)
            foreach (var comp in tracker.Components)
            {
                map.Add(comp.Id, comp.ToDto());
            }

        return new TrackerDto
        {
            Id = tracker.Id!,
            Name = tracker.Name,
            Description = tracker.Description,
            Deploy = tracker.Deploy,
            Components = map,
            CreatedAt = tracker.CreatedAt
        };
    }
}
