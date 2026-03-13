using MongoDB.Driver;
using server.Dtos;
using server.Interfaces;
using server.Models.MongoDb;

namespace server.Repos;

public class TrackerRepo(IMongoDatabase db) : MongoRepo<Tracker>(db, "trackers"), ITrackerRepo
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
