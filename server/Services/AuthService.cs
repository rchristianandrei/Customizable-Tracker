using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Services;

public class AuthService(IPasswordHasher<User> passwordHasher)
{
    private readonly IPasswordHasher<User> passwordHasher = passwordHasher;

    public void CreateUser(User user, string password)
    {
        user.PasswordHash = this.passwordHasher.HashPassword(user, password);
    }

    public bool VerifyPassword(User user, string password)
    {
        var result = this.passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            password);

        return result == PasswordVerificationResult.Success;
    }
}
