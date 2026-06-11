using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Absence_Management_API.Domain.Entities;
using Absence_Management_API.Domain.Interfaces;

namespace Absence_Management_API.Application.Controllers;

[Produces("application/json")]
[Route("api/absence-requests")]
[ApiController]
[EnableCors("AllowReactApp")]
public class AbsenceRequestsController : ControllerBase
{
    private readonly IAbsenceRepository _absenceRepository;
    
    public AbsenceRequestsController(IAbsenceRepository absenceRepository) =>
        _absenceRepository = absenceRepository;
    
    // GET api/absence-requests
    [HttpGet]
    public Task<IEnumerable<AbsenceRequest>> GetAllAsync()
    {
        return _absenceRepository.GetAllAsync();
    }
    
    // TODO: GET api/absence-requests/{id}
    
    // TODO: POST api/absence-requests
    
    // TODO: PUT api/absence-requests/{id}
}