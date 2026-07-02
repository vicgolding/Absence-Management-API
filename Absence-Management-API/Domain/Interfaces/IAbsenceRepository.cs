using Absence_Management_API.Domain.Entities;
namespace Absence_Management_API.Domain.Interfaces;

public interface IAbsenceRepository
{
    Task<List<AbsenceRequest>> GetAllAsync();
    Task<AbsenceRequest?> GetRequestById(Guid id);
    // TODO: Task<AbsenceRequest?> GetRequestByEmployeeId(int employeeId);
    Task AddAsync(AbsenceRequest request);
    Task<AbsenceRequest?> UpdateAsync(Guid id, AbsenceRequest request);
    Task<AbsenceRequest?> RemoveAsync(Guid id);
}