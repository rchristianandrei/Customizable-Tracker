using MongoDB.Driver;
using server.Dtos.SubmittedTracker;
using server.Models;
using server.Models.MongoDb;

namespace server.Repos;

public class SubmittedTrackerRepo(IMongoDatabase db)
{
    private readonly IMongoCollection<SubmittedTracker> _trackers = db.GetCollection<SubmittedTracker>("trackers");

    public async Task<SubmittedTracker> CreateAsync(CreateSubmittedTrackerDto request)
    {
        var tracker = new SubmittedTracker
        {
            TrackerId = request.TrackerId,
            TrackerName = request.TrackerName,
            Components = request.Components
        };

        await _trackers.InsertOneAsync(tracker);
        return tracker;
    }

    public async Task<List<SubmittedTracker>> GetAllByTrackerIdAndDateRange(string  trackerId , DateTime from, DateTime to)
    {
        var data = await _trackers.FindAsync(t => t.TrackerId == trackerId && t.CreatedAt >= from && t.CreatedAt <= to);
        return await data.ToListAsync();
    }
}
