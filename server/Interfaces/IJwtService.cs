using server.Models;

namespace server.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}
