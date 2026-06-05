using Absence_Management_API.Domain.Enums;

namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; private set; }
    public int EmployeeId { get; private set; }
    public AbsenceType AbsenceType { get; private set; }
    public AbsenceStatus AbsenceStatus { get; private set; } 
    private DateTime _startDate;
    private DateTime _endDate;
    public string Comment { get; private set; }

    public AbsenceRequest(Guid id, int employeeId, AbsenceType absenceType, AbsenceStatus absenceStatus,
        DateTime startDate, DateTime endDate, string? comment = null)
    {
        Id = Guid.NewGuid();
        EmployeeId = employeeId;
        AbsenceType = absenceType;
        AbsenceStatus = 0;
        _startDate = startDate;
        _endDate = endDate;
    }
    
    public void ApproveRequest()
    {
        try
        {
            if ( _startDate >= _endDate || _endDate <= _startDate || AbsenceStatus != 0 )
            {
                throw new Exception();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("An exception has occurred!", e.Message);
        }
    }

    public void DeclineRequest()
    {
        try
        {
            if (_startDate >= _endDate || _endDate <= _startDate || AbsenceStatus != 0)
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