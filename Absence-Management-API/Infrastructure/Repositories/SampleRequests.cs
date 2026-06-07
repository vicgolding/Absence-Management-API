using Absence_Management_API.Domain.Interfaces;

namespace Absence_Management_API.Infrastructure.Repositories;

public class SampleRequests
{
    private readonly IAbsenceRepository _absencesRepository;
    public SampleRequests(IAbsenceRepository absenceRepository) => _absencesRepository = absenceRepository;
}