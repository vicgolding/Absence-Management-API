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
            new AbsenceRequest(Guid.NewGuid(), 1, 0, 0, new DateTime(), new DateTime()),
            new AbsenceRequest(Guid.NewGuid(), 2, 0, 0, new DateTime(), new DateTime()),
            new AbsenceRequest(Guid.NewGuid(), 3, 0, 0, new DateTime(), new DateTime())
        );
        db.SaveChanges();
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

app.MapGet("/", () => "Hello World!");
app.MapGet("/api/absence-requests", async (ApplicationDbContext db) =>
    await db.AbsenceRequests.ToListAsync());

// Start web server and begin listening to requests
app.Run();