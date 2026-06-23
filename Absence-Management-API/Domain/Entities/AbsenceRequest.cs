using System.ComponentModel.DataAnnotations;
using Absence_Management_API.Domain.Enums;

namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; private set; }
    // public int EmployeeId { get; private set; }
    [StringLength(
        100, ErrorMessage = "The employee name field cannot exceed 100 characters. "
    )]
    public string EmployeeName { get; private set; }
    public AbsenceType AbsenceType { get; private set; }
    public AbsenceStatus AbsenceStatus { get; private set; } 
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    [StringLength(
        100, ErrorMessage = "The comment field cannot exceed 100 characters. "
    )]
    // TODO: auto-property accessor 'Comment.get' is never used
    public string? Comment { get; private set; }

    /*
     * TODO: Convert into primary constructor
     * Error at runtime:
     * Primary constructor was not suitable and had parameters that could not be bound
     * to properties of the type.
     * Cannot bind 'employeeName', 'absenceType', 'absenceStatus', 'startDate', 'endDate', 'comment'
     * Note that only mapped properties can be bound to constructor parameters.
     * Navigations to related entities, including references to owned types, cannot be bound.
    */
    public AbsenceRequest(
        string employeeName,
        AbsenceType absenceType,
        AbsenceStatus absenceStatus,
        DateTime startDate,
        DateTime endDate,
        string? comment
    )
    {
        /*
         * TODO: Initialise a new instance of the KeyAttribute class
         * [Key] denotes one or more properties that uniquely identify an entity.
         * [Key] is not valid on this data type.
         * It is valid on 'property, field' declarations only.
        */
        Id = Guid.NewGuid();
        // TODO: EmployeeId = employeeId;
        EmployeeName = employeeName;
        AbsenceType = absenceType;
        AbsenceStatus = absenceStatus;
        StartDate = startDate;
        EndDate =  endDate;
        Comment = comment;
    }
    
    public void ApproveRequest()
    {
        try
        {
            if ( 
                StartDate >= EndDate
                || EndDate <= StartDate
                || AbsenceStatus != AbsenceStatus.Pending 
            )
            {
                throw new Exception();
            }
        }
        catch (Exception error)
        {
            // TODO: argument 'e.Message' is not used in format string
            Console.WriteLine("An exception has occurred!", error.Message);
        }
    }

    public void DenyRequest()
    {
        try
        {
            if (
                StartDate >= EndDate
                || EndDate <= StartDate
                || AbsenceStatus != AbsenceStatus.Pending
            )
            {
                throw new Exception();
            }
        }
        catch (Exception error)
        {
            // TODO: argument 'e.Message' is not used in format string
            Console.WriteLine("An exception has occurred!", error.Message);   
        }
    }
}