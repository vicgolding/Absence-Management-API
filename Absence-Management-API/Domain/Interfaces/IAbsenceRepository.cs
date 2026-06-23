using Absence_Management_API.Domain.Entities;
namespace Absence_Management_API.Domain.Interfaces;

public interface IAbsenceRepository
{
    Task<List<AbsenceRequest>> GetAllAsync();
    Task<AbsenceRequest?> GetRequestByEmployeeName(string employeeName);
    // TODO: Task<AbsenceRequest?> GetRequestById(Guid id);
    // TODO: Task<AbsenceRequest?> GetRequestByEmployeeId(int employeeId);
    Task AddAsync(AbsenceRequest request);
    // TODO: Task<AbsenceRequest?> UpdateAsync(AbsenceRequest request);
    // TODO: Task<AbsenceRequest?> RemoveAsync(Guid id);
}