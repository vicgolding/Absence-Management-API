using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Infrastructure;
using Absence_Management_API.Infrastructure.Repositories;
using Absence_Management_API.Domain.Entities;
using Absence_Management_API.Domain.Interfaces;
using Absence_Management_API.Domain.Enums;
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
            new AbsenceRequest(
                "Leia Organa",
                AbsenceType.Holiday,
                0,
                new DateTime(1970, 1, 1),
                new DateTime(1970, 1, 4),
                "Doggo ipsum shoober pupperino pats smol ruff fat boi maximum borkdrive."
            ),
            new AbsenceRequest(
                "Tommy Vercetti",
                AbsenceType.Illness,
                0, 
                new DateTime(1970, 1, 5), 
                new DateTime(1970, 1, 7),
                "heckin good boys and girls pupper big ol pupper doge"
            ),
            new AbsenceRequest(
                "Diana Prince", 
                AbsenceType.Course, 
                0, 
                new DateTime(1970, 1, 8), 
                new DateTime(1970, 1, 10), 
                "Borkf wow such tempt heckin bork big ol pupper shoober tungg"
            ),
            new AbsenceRequest(
                "John Marston", 
                AbsenceType.Other, 
                0, 
                new DateTime(1970, 1, 11), 
                new DateTime(1970, 1, 14), 
                "doing me a frighten most angery pupper I have ever seen"
            )
        );
        db.SaveChanges();
        var query 
            = from r in db.AbsenceRequests
            orderby r.EmployeeName
            select r;
        Console.WriteLine("Seed of mock data successful.");
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