using Microsoft.EntityFrameworkCore;
using FitnessTracker.Models;

namespace FitnessTracker.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Exercise> Exercises => Set<Exercise>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Exercise>().HasData(
            new Exercise { Id = 1, Name = "Squat",             MuscleGroup = "Legs",        Type = "Compound" },
            new Exercise { Id = 2, Name = "Bench Press",       MuscleGroup = "Chest",       Type = "Compound" },
            new Exercise { Id = 3, Name = "Barbell Row",       MuscleGroup = "Back",        Type = "Compound" },
            new Exercise { Id = 4, Name = "Overhead Press",    MuscleGroup = "Shoulders",   Type = "Compound" },
            new Exercise { Id = 5, Name = "Romanian Deadlift", MuscleGroup = "Legs",        Type = "Compound" },
            new Exercise { Id = 6, Name = "Deadlift",          MuscleGroup = "Back",        Type = "Compound" }
        );
    }
}