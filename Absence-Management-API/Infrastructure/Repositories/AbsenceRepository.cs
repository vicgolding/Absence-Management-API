using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Interfaces;
using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Infrastructure.Repositories;

public class AbsenceRepository : IAbsenceRepository
{
    private readonly ApplicationDbContext _context;
    
    public Task AddAsync(AbsenceRequest request)
    {
        return Task.CompletedTask;
    }

    public async Task<IEnumerable<AbsenceRequest>> GetAllAsync()
    {
        return await _context.AbsenceRequests.ToListAsync();
    }
}