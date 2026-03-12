using System.ComponentModel.DataAnnotations;

namespace server.Dtos.Component;

public class UpdateTextboxDto
{
    public string Id { get; set; } = null!;

    [Required]
    [MaxLength(30)]
    public string Label { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Placeholder { get; set; } = string.Empty;

    public bool Required { get; set; } = false;

    public int MaxLength { get; set; } = 20;
}
