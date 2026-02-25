using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Tracker;

public class CreateTrackerDto
{
    [Required]
    [MaxLength(30)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Description { get; set; } = string.Empty;
}
