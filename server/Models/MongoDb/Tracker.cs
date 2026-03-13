using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using server.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace server.Models.MongoDb;

public class Tracker : IEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Description { get; set; } = string.Empty;

    public string UserEmail { get; set; } = string.Empty;

    public ICollection<TextboxComponent> Components { get; set; } = [];


    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}

[BsonDiscriminator(RootClass = true)]
[BsonKnownTypes(typeof(TextboxComponent), typeof(DropdownComponent))]
public class BaseComponent
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    [Required]
    [MaxLength(30)]
    public string Label { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Placeholder { get; set; } = string.Empty;

    [Range(1, 20)]
    public int Order { get; set; }

    public bool Required { get; set; } = false;

    public string? DependsOnId { get; set; } = null;
}

public class TextboxComponent : BaseComponent
{
    public int MaxLength { get; set; } = 20;
}

public class DropdownComponent : BaseComponent
{
    public Dictionary<string, string> Disposition { get; set; } = [];
}
