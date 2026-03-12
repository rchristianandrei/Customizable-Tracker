using MongoDB.Driver;
using server.Dtos;
using server.Models.MongoDb;

namespace server.Repos;

public class TrackerRepo(IMongoDatabase db) : MongoRepo<Tracker>(db, "trackers")
{
    public async Task<List<Tracker>> GetAll(FilterDefinition<Tracker> filter, PaginatedQueryParameters dto)
    {
        return await entities
            .Find(filter)
            .SortByDescending(t => t.CreatedAt)
            .Skip((dto.PageOrDefault - 1) * dto.PageSizeOrDefault)
            .Limit(dto.PageSizeOrDefault)
            .ToListAsync();
    }
}
