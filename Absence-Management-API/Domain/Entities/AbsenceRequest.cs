namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; set; }
    public int EmployeeId { get; set; }
    public string AbsenceType { get; set; }
    public string AbsenceStatus { get; set; }
    public struct StartDate;
    public struct EndDate;
    public string Comment { get; set; }
    
    public AbsenceRequest() {}
}