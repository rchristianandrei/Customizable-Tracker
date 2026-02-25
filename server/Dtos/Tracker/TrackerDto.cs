using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Tracker;

public class TrackerDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public DateTime CreatedAt { get; set; }
}
