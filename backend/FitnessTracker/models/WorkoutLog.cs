namespace FitnessTracker.Models;

public class WorkoutLog
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public int ExerciseId { get; set; }
    public int Sets { get; set; }
    public int Reps { get; set; }
    public double Weight { get; set; }

    public Exercise? Exercise { get; set; }
}
