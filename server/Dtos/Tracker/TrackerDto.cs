using server.Dtos.Component;
using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Tracker;

public class TrackerDto
{
    [Required]
    public string Id { get; set; } = null!;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public ICollection<TextboxDto> Components { get; set; } = [];

    [Required]
    public DateTime CreatedAt { get; set; }
}
