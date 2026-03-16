using server.Dtos.Component;
using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Tracker;

public class UpdateTrackerDto
{
    public string Id { get; set; } = null!;

    [Required]
    [MaxLength(30)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public bool Deploy { get; set; } = false;

    public List<UpdateTextboxDto> Components { get; set; } = [];
}
