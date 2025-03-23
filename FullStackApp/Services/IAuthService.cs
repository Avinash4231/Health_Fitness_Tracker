namespace FullStackApp.Services
{
    public interface IAuthService
    {
        Task<Object> Authenticate(string Email, string PasswordHash);
    }
}
