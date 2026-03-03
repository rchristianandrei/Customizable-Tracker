using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class TextboxComponent
{
    public int Id { get; set; }

    public int TrackerId { get; set; }

    public Tracker Tracker { get; set; } = null!;

    [Required]
    [MaxLength(30)]
    public string Label { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Placeholder { get; set; } = string.Empty;

    [Range(1,20)]
    public int Order { get; set; }

    public bool Required { get; set; } = false;

    public int MaxLength { get; set; } = 20;

    public DateTime CreatedAt { get; set; }
}
