namespace FitnessTracker.Models;

public class Exercise
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string MuscleGroup { get; set; } = string.Empty;  // e.g. Chest, Back, Legs
    public string Type { get; set; } = string.Empty;         // e.g. Compound, Isolation
}