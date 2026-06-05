using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Domain.Interfaces;

public interface IAbsenceRepository
{
    Task AddAsync(AbsenceRequest request);
    Task AddRangeAsync(IEnumerable<AbsenceRequest> requests);
    Task<IEnumerable<AbsenceRequest>> GetAllAsync();
    Task<AbsenceRequest?> FindAsync(Guid id);
    Task<AbsenceRequest?> RemoveAsync(Guid id);
    Task<AbsenceRequest?> UpdateAsync(AbsenceRequest request);
}