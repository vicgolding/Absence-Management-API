using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Interfaces;
using Absence_Management_API.Domain.Entities;
namespace Absence_Management_API.Infrastructure.Repositories;

public class AbsenceRepository : IAbsenceRepository
{
    private readonly ApplicationDbContext _context;
    
    public AbsenceRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<AbsenceRequest>> GetAllAsync()
    {
        return await _context.AbsenceRequests.ToListAsync();
    }

    public async Task<AbsenceRequest?> GetRequestByEmployeeName(String employeeName)
    {
        return await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.EmployeeName == employeeName);
    }
    
    /* TODO:
    public async Task<AbsenceRequest?> GetRequestById(Guid id)
    {
        return await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
    }
    */

    public async Task AddAsync(AbsenceRequest request)
    {
        _context.AbsenceRequests.Add(request);
        await _context.SaveChangesAsync();
    }

}