using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos.Auth;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(ApplicationDbContext _context, AuthService _authService) : ControllerBase
{
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto value)
    {
        var user = await _context.Users.FindAsync(value.Email);

        if (user == null) 
            return Unauthorized("Invalid Credentials");

        if(!_authService.VerifyPassword(user, value.Password))
            return Unauthorized("Invalid Credentials");

        return Ok(new AuthDto { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName});
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto value)
    {
        var user = new User
        {
            Email = value.Email,
            FirstName = value.FirstName,
            LastName = value.LastName,
        };

        _authService.CreateUser(user, value.Password);

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return Ok();
    }

    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
}
