using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos.Auth;
using server.Interfaces;
using server.Models;
using server.Services;
using server.Settings;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
    ApplicationDbContext _context,
    AuthService _authService,
    IJwtService _jwtService,
    JwtSettings _jwtSettings
    ) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto value)
    {
        var user = await _context.Users.FindAsync(value.Email);

        if (user == null)
            return Unauthorized("Invalid Credentials");

        if (!_authService.VerifyPassword(user, value.Password))
            return Unauthorized("Invalid Credentials");

        var token = _jwtService.GenerateToken(user);

        Response.Cookies.Append("Authorization", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_jwtSettings.ExpireMinutes))
        });

        return Ok(new AuthDto { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName });
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
}
