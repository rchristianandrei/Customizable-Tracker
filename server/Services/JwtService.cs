using Microsoft.IdentityModel.Tokens;
using server.Interfaces;
using server.Models;
using server.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Services;

public class JwtService(JwtSettings _jwtSettings) : IJwtService
{
    public string GenerateToken(User user)
    {
        var key = _jwtSettings.Key;
        var issuer = _jwtSettings.Issuer;
        var audience = _jwtSettings.Audience;
        var expiration = _jwtSettings.ExpireMinutes ?? "60";

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key ?? throw new InvalidOperationException("Missing JWT Key")));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Double.Parse(expiration)),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
