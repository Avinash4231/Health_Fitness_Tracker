using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class ProgressTracking
    {
        [Key]
        public int ProgressId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required, Range(10, 300)] // Weight must be between 10kg and 300kg
        public decimal WeightKG { get; set; }   

        public decimal? BMI { get; set; } // Can be calculated as Weight / (Height * Height)

        [Range(1, 50)] // Body Fat Percentage should be between 1% and 50%
        public decimal? BodyFatPercentage { get; set; }

        public DateTime CheckingDate { get; set; }
    }
}
