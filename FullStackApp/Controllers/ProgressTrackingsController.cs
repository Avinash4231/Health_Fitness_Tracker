using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;
using FullStackApp.Models;
using FullStackApp.Services;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressTrackingsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;
        //private readonly ProgressTrackingService _progressTrackingService;


        public ProgressTrackingsController(EFCoreDbContext context)
        {
            _context = context;
            //_progressTrackingService = progressTrackingService;
        }

        // GET: api/ProgressTrackings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressTracking>>> GetProgressTracking()
        {
            return await _context.ProgressTracking.ToListAsync();
        }

        // GET: api/ProgressTrackings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgressTracking>> GetProgressTracking(int id)
        {
            var progressTracking = await _context.ProgressTracking.FindAsync(id);

            if (progressTracking == null)
            {
                return NotFound();
            }

            return progressTracking;
        }

    


        [HttpPost("update/{userId}")]
        public async Task<IActionResult> UpdateProgress(int userId)
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

            return Ok(newProgress);
        }

        // GET: api/ProgressTrackings/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ProgressTracking>>> GetProgressTrackingByUserId(int userId)
        {
            // Fetch progress tracking records by userId
            var progressTrackings = await _context.ProgressTracking
                                                   .Where(pt => pt.UserId == userId)
                                                   .ToListAsync();

            if (progressTrackings == null || !progressTrackings.Any())
            {
                return NotFound(); // If no progress tracking records found for the user
            }

            return Ok(progressTrackings); // Return the list of progress tracking records
        }


        // PUT: api/ProgressTrackings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgressTracking(int id, ProgressTracking progressTracking)
        {
            if (id != progressTracking.ProgressId)
            {
                return BadRequest();
            }

            _context.Entry(progressTracking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgressTrackingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProgressTrackings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProgressTracking>> PostProgressTracking(ProgressTracking progressTracking)
        {
            _context.ProgressTracking.Add(progressTracking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProgressTracking", new { id = progressTracking.ProgressId }, progressTracking);
        }

        // DELETE: api/ProgressTrackings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgressTracking(int id)
        {
            var progressTracking = await _context.ProgressTracking.FindAsync(id);
            if (progressTracking == null)
            {
                return NotFound();
            }

            _context.ProgressTracking.Remove(progressTracking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProgressTrackingExists(int id)
        {
            return _context.ProgressTracking.Any(e => e.ProgressId == id);
        }
    }
}
