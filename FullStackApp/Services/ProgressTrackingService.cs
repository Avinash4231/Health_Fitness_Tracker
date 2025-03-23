using FullStackApp.Data;
using FullStackApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Services
{
    public class ProgressTrackingService
    {
        private readonly EFCoreDbContext _context;

        public ProgressTrackingService(EFCoreDbContext context)
        {
            _context = context;
        }

        public async Task UpdateWeeklyProgress(int userId)
        {
            var lastProgress = await _context.ProgressTracking
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CheckingDate)
                .FirstOrDefaultAsync();

            decimal lastWeight = lastProgress?.WeightKG ??
                _context.Users.Where(u => u.UserId == userId)
                             .Select(u => u.Weight)
                             .FirstOrDefault();

            var lastWeekWorkouts = await _context.UserWorkout
                .Where(w => w.UserId == userId && w.WorkoutDate >= DateTime.UtcNow.AddDays(-7))
                .ToListAsync();

            double totalCaloriesBurned = lastWeekWorkouts.Sum(w => w.CaloriesBurned);

            // Approximate weight loss formula: 7700 calories = 1kg weight loss
            decimal weightLoss = (decimal)(totalCaloriesBurned / 7700.0); // Convert to decimal
            decimal updatedWeight = lastWeight - weightLoss;

            decimal height = _context.Users.Where(u => u.UserId == userId)
                                           .Select(u => u.Height)
                                           .FirstOrDefault();

            decimal bmi = updatedWeight / (decimal)Math.Pow((double)height / 100, 2); // Ensure proper type conversion

            var newProgress = new ProgressTracking
            {
                UserId = userId,
                WeightKG = updatedWeight,
                BMI = bmi,
                BodyFatPercentage = lastProgress?.BodyFatPercentage ?? 20, // Placeholder
                CheckingDate = DateTime.UtcNow
            };

            _context.ProgressTracking.Add(newProgress);
            await _context.SaveChangesAsync();
        }

    }

}
