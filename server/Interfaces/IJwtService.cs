using server.Models.MySql;

namespace server.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}
