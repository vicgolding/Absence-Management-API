using Absence_Management_API.Domain.Enums;

namespace Absence_Management_API.Domain.Entities;

public class AbsenceRequest
{
    public Guid Id { get; private set; }
    public int EmployeeId { get; private set; }
    public AbsenceType AbsenceType { get; private set; }
    public AbsenceStatus AbsenceStatus { get; private set; } 
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Comment { get; private set; }

    public AbsenceRequest(Guid id, int employeeId, AbsenceType absenceType, AbsenceStatus absenceStatus, DateTime startDate, DateTime endDate,
        string comment = null)
    {
        Id = Guid.NewGuid();
        EmployeeId = employeeId;
        AbsenceType = absenceType;
        AbsenceStatus = 0;
        StartDate = new DateTime(2026, 6, 6);
        EndDate =  new DateTime(2026, 6, 7);
        Comment = "Lorem ipsum";
    }
    
    public void ApproveRequest()
    {
        try
        {
            if ( StartDate >= EndDate || EndDate <= StartDate || AbsenceStatus != 0 )
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
            if (StartDate >= EndDate || EndDate <= StartDate || AbsenceStatus != 0)
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