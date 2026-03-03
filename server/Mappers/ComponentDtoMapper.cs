using server.Dtos.Component;
using server.Models;

namespace server.Mappers;

public static class ComponentDtoMapper
{
    public static TextboxDto ToDto(this TextboxComponent textbox)
    {
        return new TextboxDto
        {
            Id = textbox.Id,
            Label = textbox.Label,
            Placeholder = textbox.Placeholder,
            Required = textbox.Required,
            Order = textbox.Order,
            MaxLength = textbox.MaxLength,
        };
    }
}
