using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Auth;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(ApplicationDbContext _context, AuthService _authService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    [HttpGet("{email}")]
    public async Task<IActionResult> Get(string email)
    {
        var user = await _context.Users.FindAsync(email);
        
        if(user == null) return NotFound();

        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] RegisterUserDto value)
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

    [HttpDelete("{email}")]
    public async Task<IActionResult> Delete(string email)
    {
        var user = await _context.Users.FindAsync(email);

        if (user == null) return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
