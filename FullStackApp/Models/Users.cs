using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(100)] // Full name should not exceed 100 characters    
        public string FullName { get; set; }

        [Required, EmailAddress, MaxLength(100)] // Email must be unique and valid
        public string Email { get; set; }

        [Required, MinLength(8)] // Password must be at least 8 characters (hashed)
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required, MaxLength(10)] // Gender should be "Male", "Female", or "Other"
        public string Gender { get; set; }

        [Required, Range(50, 250)] // Height must be between 50cm and 250cm
        public decimal Height { get; set; }

        [Required, Range(10, 300)] // Weight must be between 10kg and 300kg
        public decimal Weight { get; set; }

        public string? SessionKey { get; set; } // New field to track session

    }
}
