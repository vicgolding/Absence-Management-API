using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Domain.Entities;

namespace Absence_Management_API.Infrastructure;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AbsenceRequest> AbsenceRequests { get; set; }
}