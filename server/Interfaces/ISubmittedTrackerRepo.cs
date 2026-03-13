using server.Models.MongoDb;

namespace server.Interfaces;

public interface ISubmittedTrackerRepo : IMongoRepo<SubmittedTracker>
{
    Task<IEnumerable<SubmittedTracker>> GetAllByTrackerIdAndDateRange(string trackerId, DateTime from, DateTime to);
}