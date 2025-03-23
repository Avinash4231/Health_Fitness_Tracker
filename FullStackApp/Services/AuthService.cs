using FullStackApp.Data;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System;


namespace FullStackApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly EFCoreDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public AuthService(EFCoreDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<object> Authenticate(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null || user.PasswordHash != password) // Use hashed passwords in production
            {
                return null;
            }
            // Check if user is already logged in elsewhere
    if (!string.IsNullOrEmpty(user.SessionKey))
    {
        return new { Message = "You are logged in somewhere else. Please log out from other devices." };
    }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                signingCredentials: credentials
            );

            string sessionKey = Guid.NewGuid().ToString();
            user.SessionKey = sessionKey;
    await _context.SaveChangesAsync();

            return new
    {
        Token = new JwtSecurityTokenHandler().WriteToken(token),
        User = user,  // Directly return user details
        SessionKey = sessionKey
    };
            // return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
