using server.Dtos.Auth;
using server.Models;

namespace server.Mappers;

public static class AuthDtoMapper
{
    public static AuthDto ToAuthDto(this User user)
    {
        return new AuthDto { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName };
    }
}
