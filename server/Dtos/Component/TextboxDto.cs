namespace server.Dtos.Component;

public class TextboxDto
{
    public int Id { get; set; }

    public string Label { get; set; } = string.Empty;

    public string Placeholder { get; set; } = string.Empty;

    public int Order { get; set; }

    public bool Required { get; set; } = false;

    public int MaxLength { get; set; } = 20;
}
