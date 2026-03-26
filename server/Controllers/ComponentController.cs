using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Mappers;

namespace server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ComponentController : ControllerBase
{
    [HttpPost("textbox")]
    public async Task<IActionResult> PostTextbox()
    {
        var texbox = new Models.MongoDb.TextboxComponent
        {
            Label = "Textbox",
            Placeholder = "Placeholder",
        };

        return Ok(texbox.ToDto());
    }
}
