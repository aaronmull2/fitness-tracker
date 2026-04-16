using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.Data;
using FitnessTracker.Models;

namespace FitnessTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkoutLogsController : ControllerBase
{
    private readonly AppDbContext _db;

    public WorkoutLogsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var logs = await _db.WorkoutLogs
            .Where(w => w.UserId == userId)
            .Include(w => w.Exercise)
            .OrderByDescending(w => w.Date)
            .ToListAsync();

        return Ok(logs);
    }

    [HttpPost]
    public async Task<IActionResult> Create(WorkoutLog log)
    {
        log.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        log.Date = DateTime.UtcNow;

        _db.WorkoutLogs.Add(log);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = log.Id }, log);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WorkoutLog updated)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var log = await _db.WorkoutLogs.FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);
        if (log is null) return NotFound();

        log.ExerciseId = updated.ExerciseId;
        log.Sets = updated.Sets;
        log.Reps = updated.Reps;
        log.Weight = updated.Weight;
        log.Date = updated.Date;

        await _db.SaveChangesAsync();
        return Ok(log);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var log = await _db.WorkoutLogs.FirstOrDefaultAsync(w => w.Id == id && w.UserId == userId);
        if (log is null) return NotFound();

        _db.WorkoutLogs.Remove(log);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
