using System.ComponentModel.DataAnnotations;
using Absence_Management_API.Domain.Enums;

namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; private set; }
    // public int EmployeeId { get; private set; }
    [RegularExpression(@"^\d$", ErrorMessage = "The name cannot contain numbers.")]
    [StringLength(
        75, ErrorMessage = "The employee name field cannot exceed 100 characters. "
    )]
    public string EmployeeName { get; private set; }
    public AbsenceType AbsenceType { get; private set; }
    public AbsenceStatus AbsenceStatus { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime StartDate { get; private set; }
    [DataType(DataType.DateTime)]
    public DateTime EndDate { get; private set; }
    [StringLength(
        150, ErrorMessage = "The comment field cannot exceed 100 characters. "
    )]
    // TODO: auto-property accessor 'Comment.get' is never used
    public string? Comment { get; private set; }
    
    public AbsenceRequest(
        string employeeName,
        AbsenceType absenceType,
        AbsenceStatus absenceStatus,
        DateTime startDate,
        DateTime endDate,
        string? comment
    )
    {
        Id = Guid.NewGuid();
        // TODO: EmployeeId = employeeId;
        EmployeeName = employeeName;
        AbsenceType = absenceType;
        AbsenceStatus = absenceStatus;
        Comment = comment;
        var comparisonResult = DateTime.Compare(startDate, endDate);
        if (comparisonResult > 0)
        {
            throw new Exception("Enddatum darf nicht vor dem Startdatum liegen");
        }
        StartDate = startDate;
        EndDate = endDate;
    }
}