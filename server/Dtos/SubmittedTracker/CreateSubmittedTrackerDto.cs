using server.Models.MongoDb;

namespace server.Dtos.SubmittedTracker;

public class CreateSubmittedTrackerDto
{
    public string TrackerId { get; set; } = null!;

    public string TrackerName { get; set; } = null!;

    public List<SubmittedComponent> Components { get; set; } = [];
}
