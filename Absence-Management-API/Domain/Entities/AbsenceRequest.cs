using Absence_Management_API.Domain.Enums;

namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; private set; }
    public int EmployeeId { get; private set; }
    public AbsenceType AbsenceType { get; private set; }
    public AbsenceStatus AbsenceStatus { get; private set; } 
    // TODO: public static readonly DateTime StartDate;
    // TODO: public static readonly DateTime EndDate;
    public string Comment { get; private set; }

    public AbsenceRequest(Guid id, int employeeId, AbsenceType absenceType, AbsenceStatus absenceStatus,
        string? comment = null)
    {
        Id = Guid.NewGuid();
        EmployeeId = employeeId;
        AbsenceType = absenceType;
        AbsenceStatus = 0;
        // TODO: _startDate = startDate;
        // TODO: _endDate = endDate;
        Comment = "";
    }
    
    public void ApproveRequest()
    {
        try
        {
            if (AbsenceStatus != 0 )
            {
                throw new Exception();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("An exception has occurred!", e.Message);
        }
    }

    public void DenyRequest()
    {
        try
        {
            if (AbsenceStatus != 0)
            {
                throw new Exception();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("An exception has occurred!", e.Message);   
        }
    }
}