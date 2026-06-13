using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Infrastructure;
using Absence_Management_API.Infrastructure.Repositories;
using Absence_Management_API.Domain.Entities;
using Absence_Management_API.Domain.Interfaces;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
 
// Add services to the container.
builder.Services.AddScoped<IAbsenceRepository, AbsenceRepository>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("DataSource=absencerequests.db"));

// Add controller services
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        // TODO: parameter 'builder' hides outer local variable with the same name
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Finalise service container and create application pipeline
var app = builder.Build();

// Seed mock data immediately upon startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
    if (!db.AbsenceRequests.Any())
    {
        db.AbsenceRequests.AddRange(
            new AbsenceRequest("Leia Organa", 0, 0, new DateTime(1970, 1, 1), new DateTime(1970, 5, 4), ""),
            new AbsenceRequest("Tommy Vercetti", 0, 0, new DateTime(1970, 1, 1), new DateTime(1970, 5, 4), ""),
            new AbsenceRequest("Diana Prince", 0, 0, new DateTime(1970, 1, 1), new DateTime(1970, 5, 4), "")
        );
        db.SaveChanges();
        var query = from r in db.AbsenceRequests
            orderby r.EmployeeName
            select r;
        Console.WriteLine("Seed of mock data successful.");
        foreach (var r in query)
        {
            Console.WriteLine($"{r.EmployeeName} requests absence with ID number {r.Id}");
        }
        Console.WriteLine("Press a key to exit...");
        Console.ReadKey();
    }
}

app.UseCors("AllowReactApp");

// Map to endpoints
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

// Start web server and begin listening to requests
app.Run();