using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models.MongoDb;

public class SubmittedTracker
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string TrackerId { get; set; } = null!;

    public string TrackerName { get; set; } = null!;

    public List<SubmittedComponent> Components { get; set; } = [];

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
