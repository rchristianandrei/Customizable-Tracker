using server.Dtos.Component;
using server.Models;

namespace server.Services;

public class TextboxService
{
    public void Update(UpdateTextboxDto dto, int order, TextboxComponent textbox)
    {
        textbox.Label = dto.Label;
        textbox.Placeholder = dto.Placeholder;
        textbox.Order = order;
        textbox.Required = dto.Required;
        textbox.MaxLength = dto.MaxLength;
    }
}
