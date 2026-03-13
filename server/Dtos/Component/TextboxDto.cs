namespace server.Dtos.Component;

public class TextboxDto
{
    public string Id { get; set; } = null!;

    public string Label { get; set; } = string.Empty;

    public string Placeholder { get; set; } = string.Empty;

    public bool Required { get; set; } = false;

    public string? DependsOnId { get; set; } = null;

    public int MaxLength { get; set; } = 20;
}
