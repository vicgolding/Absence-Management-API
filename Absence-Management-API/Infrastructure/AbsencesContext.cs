using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Infrastructure;

public class AbsencesContext : DbContext
{
    public AbsencesContext () { }

    public DbSet<AbsenceRequest> AbsenceRequests { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("TestDb");
    }
    
}