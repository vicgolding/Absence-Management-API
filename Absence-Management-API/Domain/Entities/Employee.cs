namespace Absence_Management_API.Domain.Entities;

public class Employee(string firstName, string lastName, string email)
{
    public readonly Guid Id = Guid.NewGuid();
    public readonly string FirstName = firstName;
    public readonly string LastName = lastName;
    public readonly string Email = email;
}