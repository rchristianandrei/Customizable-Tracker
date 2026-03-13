using MongoDB.Driver;
using server.Interfaces;
using server.Models.MongoDb;

namespace server.Repos;

public class SubmittedTrackerRepo(IMongoDatabase db) : MongoRepo<SubmittedTracker>(db, "submittedTrackers"), ISubmittedTrackerRepo
{
    public async Task<IEnumerable<SubmittedTracker>> GetAllByTrackerIdAndDateRange(string trackerId, DateTime from, DateTime to)
    {
        return await this.GetAll((t) => t.TrackerId == trackerId && t.CreatedAt >= from && t.CreatedAt <= to);
    }
}
