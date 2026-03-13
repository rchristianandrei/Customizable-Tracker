using MongoDB.Driver;
using server.Dtos;
using server.Models.MongoDb;

namespace server.Interfaces;

public interface ITrackerRepo : IMongoRepo<Tracker>
{
    Task<List<Tracker>> GetAll(FilterDefinition<Tracker> filter, PaginatedQueryParameters dto);
}