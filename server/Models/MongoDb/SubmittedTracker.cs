using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Interfaces;

namespace server.Models.MongoDb;

public class SubmittedTracker : IEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string TrackerId { get; set; } = null!;

    public string TrackerName { get; set; } = null!;

    public List<SubmittedComponent> Components { get; set; } = [];

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
