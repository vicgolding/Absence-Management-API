using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Interfaces;
using Absence_Management_API.Domain.Entities;
namespace Absence_Management_API.Infrastructure.Repositories;

public class AbsenceRepository(ApplicationDbContext context) : IAbsenceRepository
{
    private readonly ApplicationDbContext _context = context;
    
    public async Task<List<AbsenceRequest>> GetAllAsync()
    {
        return await _context.AbsenceRequests.ToListAsync();
    }
    
    public async Task<AbsenceRequest?> GetRequestById(Guid id)
    {
        return await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddAsync(AbsenceRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);
        _context.AbsenceRequests.Add(request);
        await _context.SaveChangesAsync();
    }

    public async Task<AbsenceRequest?> UpdateAsync(Guid id, AbsenceRequest request)
    {
        var existingRequest = await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
        ArgumentNullException.ThrowIfNull(existingRequest);
        existingRequest.AbsenceStatus = request.AbsenceStatus;
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task<AbsenceRequest?> RemoveAsync(Guid id)
    {
        var existingRequest = await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
        ArgumentNullException.ThrowIfNull(existingRequest);
        _context.Remove(existingRequest);
        await _context.SaveChangesAsync();
        return existingRequest;
    }

    public async Task<AbsenceRequest?> ApproveRequest(Guid id)
    {
        var existingRequest = await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
        AbsenceRequest.ApproveRequest(existingRequest);
        await _context.SaveChangesAsync();
        return existingRequest;
    }

    public async Task<AbsenceRequest?> DenyRequest(Guid id)
    {
        var existingRequest = await _context.AbsenceRequests.FirstOrDefaultAsync(x => x.Id == id);
        AbsenceRequest.DenyRequest(existingRequest);
        await _context.SaveChangesAsync();
        return existingRequest;
    }
}