using Microsoft.EntityFrameworkCore;
using Absence_Management_API.Infrastructure;
using Absence_Management_API.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("DataSource=absencerequests.db"));

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();


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
app.MapControllers();

app.MapGet("/", () => "Hello World!");
app.MapGet("/api/absence-requests", async (ApplicationDbContext db) =>
    await db.AbsenceRequests.ToListAsync());

app.Run();