using FullStackApp.Services;
using Microsoft.AspNetCore.Mvc;
using FullStackApp.Models;
using FullStackApp.Middleware;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;

namespace FullStackApp.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly EFCoreDbContext _context; // Add the missing database context

        public AuthController(IAuthService authService, EFCoreDbContext context)
        {
            _authService = authService;
            _context = context; // Inject the database context
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            string encryptedPassword = EncryptionHelper.Encrypt(request.Password);
            var authResponse = await _authService.Authenticate(request.Email, encryptedPassword);

            if (authResponse is not null && authResponse.GetType().GetProperty("Message") != null)
            {
                return Unauthorized(new { Message = authResponse.GetType().GetProperty("Message").GetValue(authResponse) });
            }

            return Ok(authResponse);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.SessionKey = null; // Clear session key on logout
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Logged out successfully" });
        }

        


    }
}
