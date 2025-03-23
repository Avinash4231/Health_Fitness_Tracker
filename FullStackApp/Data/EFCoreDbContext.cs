using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using FullStackApp.Models;

namespace FullStackApp.Data
{
    public class EFCoreDbContext : DbContext
    {
        public EFCoreDbContext(DbContextOptions<EFCoreDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("Users");
            modelBuilder.Entity<UserWorkout>().ToTable("UserWorkout");
            modelBuilder.Entity<ProgressTracking>().ToTable("ProgressTracking");

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<UserWorkout> UserWorkout { get; set; }
        public DbSet<ProgressTracking> ProgressTracking { get; set; }
        // public DbSet<EmailService> EmailService { get; set; }



    }
}
