using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Models;
using FullStackApp.Middleware;
using FullStackApp.Data;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EFCoreDbContext _context;

        public UsersController(EFCoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("login/{email}/{password}")]
        public async Task<IActionResult> Login(string email, string password)
        {
            string encr = EncryptionHelper.Encrypt(password);
            Users user = _context.Users.Where(x => x.Email == email && x.PasswordHash == encr).FirstOrDefault<Users>();
            //var token = await _authService.Authenticate(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok("Correct ");
        }

        [HttpPost("SendTestMail")]
public IActionResult SendTestMail([FromBody] EmailRequestModel emailRequest)
{
    // Validate the input model
    if (emailRequest == null || string.IsNullOrEmpty(emailRequest.RecipientEmail) || string.IsNullOrEmpty(emailRequest.Subject) || string.IsNullOrEmpty(emailRequest.Body))
    {
        return BadRequest("Invalid email details.");
    }

    // Call the SendMail.MailInfo function to send the email
    string result = SendMail.MailInfo(emailRequest.RecipientEmail, emailRequest.Subject, emailRequest.Body);

    // Return appropriate response based on the result
    if (result == "success")
    {
        return Ok("Email sent successfully!");
    }
    else
    {
        return BadRequest($"Error sending email: {result}");
    }
}



        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // GET: api/Users/email@example.com
[HttpGet("/email/{email}")]
public async Task<ActionResult<Users>> GetUserByEmail(string email)
{
    // Find the user by email
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

    if (user == null)
    {
        return NotFound();
    }

    return user;
}

[HttpGet("emails")]
public async Task<ActionResult<IEnumerable<string>>> GetAllUserEmails()
{
    // Fetch all emails from the Users table
    var emails = await _context.Users
                                .Select(u => u.Email) // Select only the Email column
                                .ToListAsync(); // Convert to list

    // Check if emails exist
    if (emails == null || emails.Count == 0)
    {
        return NotFound("No emails found.");
    }

    return Ok(emails);
}



        [HttpPut("{id}")]
public async Task<IActionResult> PutUsers(int id, Users users)
{
    string encry = EncryptionHelper.Encrypt(users.PasswordHash);
            users.PasswordHash = encry;
            Console.WriteLine(users);
    // return Ok(new { message = "User updated successfully!", user = users });

    //         return 
    if (id != users.UserId)
    {
        return BadRequest("User ID mismatch.");
    }

    _context.Entry(users).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!UsersExists(id))
        {
            return NotFound($"User with ID {id} not found.");
        }
        else
        {
            throw;
        }
    }

    // Return a custom message upon successful update
    return Ok(new { message = "User updated successfully!", user = users });
}


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            string encry = EncryptionHelper.Encrypt(users.PasswordHash);
            users.PasswordHash = encry;
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.UserId }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}