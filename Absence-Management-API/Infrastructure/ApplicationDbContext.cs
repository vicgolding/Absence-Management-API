using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext (DbContextOptions options) : base(options) { }

    public DbSet<AbsenceRequest> AbsenceRequests { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("TestDb");
    }
    
}