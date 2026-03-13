using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Component;

public class CreateComponentDto
{
    [Required]
    public string TrackerId { get; set; } = null!;
}
