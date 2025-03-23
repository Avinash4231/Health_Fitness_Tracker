using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class UserWorkout
    {
        [Key]
        public int WorkOutId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required, MaxLength(20)] // Workout Type should be "Cardio", "Strength", or "Yoga"
        public string WorkOutType { get; set; }

        [Required, Range(5, 300)] // Duration should be between 5 and 300 minutes
        public int DurationMinutes { get; set; }

        [Required, Range(10, 5000)] // Calories burned should be between 10 and 5000
        public int CaloriesBurned { get; set; }

        public DateTime WorkoutDate { get; set; }
    }
}
