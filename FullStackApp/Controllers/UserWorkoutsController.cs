using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;
using FullStackApp.Models;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWorkoutsController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public UserWorkoutsController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/UserWorkouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWorkout>>> GetUserWorkout()
        {
            return await _context.UserWorkout.ToListAsync();
        }

        // GET: api/UserWorkouts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWorkout>> GetUserWorkout(int id)
        {
            var userWorkout = await _context.UserWorkout.FindAsync(id);

            if (userWorkout == null)
            {
                return NotFound();
            }

            return userWorkout;
        }

        // GET: api/UserWorkouts/user/{userId}
[HttpGet("user/{userId}")]
public async Task<ActionResult<IEnumerable<UserWorkout>>> GetUserWorkoutsByUserId(int userId)
{
    var userWorkouts = await _context.UserWorkout
                                      .Where(u => u.UserId == userId)
                                      .ToListAsync();

    if (userWorkouts == null || userWorkouts.Count == 0)
    {
        return NotFound();
    }

    return userWorkouts;
}


        // PUT: api/UserWorkouts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserWorkout(int id, UserWorkout userWorkout)
        {
            if (id != userWorkout.WorkOutId)
            {
                return BadRequest();
            }

            _context.Entry(userWorkout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserWorkoutExists(id))
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

        // POST: api/UserWorkouts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserWorkout>> PostUserWorkout(UserWorkout userWorkout)
        {
            _context.UserWorkout.Add(userWorkout);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserWorkout", new { id = userWorkout.WorkOutId }, userWorkout);
        }

        // DELETE: api/UserWorkouts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserWorkout(int id)
        {
            var userWorkout = await _context.UserWorkout.FindAsync(id);
            if (userWorkout == null)
            {
                return NotFound();
            }

            _context.UserWorkout.Remove(userWorkout);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserWorkoutExists(int id)
        {
            return _context.UserWorkout.Any(e => e.WorkOutId == id);
        }
    }
}
