using server.Models;

namespace server.Interfaces
{
    public interface IAuthService
    {
        void CreateUser(User user, string password);
        bool VerifyPassword(User user, string password);
    }
}