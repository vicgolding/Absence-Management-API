using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Domain.Interfaces;

public interface IAbsenceRepository
{
    Task AddAsync(AbsenceRequest request);
    Task<IEnumerable<AbsenceRequest>> GetAllAsync();
    // TODO: Task<AbsenceRequest?> FindAsync(Guid id);
    // TODO: Task<AbsenceRequest?> RemoveAsync(Guid id);
    // TODO: Task<AbsenceRequest?> UpdateAsync(AbsenceRequest request);
}