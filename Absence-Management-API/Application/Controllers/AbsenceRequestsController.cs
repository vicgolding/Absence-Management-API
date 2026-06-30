using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Absence_Management_API.Domain.Entities;
using Absence_Management_API.Domain.Interfaces;

namespace Absence_Management_API.Application.Controllers;

[Produces("application/json")]
[Route("api/absence-requests")]
[ApiController]
[EnableCors("AllowReactApp")]
public class AbsenceRequestsController(IAbsenceRepository absenceRepository) : ControllerBase
{
    private readonly IAbsenceRepository _absenceRepository = absenceRepository;
    
    // GET api/absence-requests
    [HttpGet]
    public Task<List<AbsenceRequest>> GetAllAsync()
    {
        return _absenceRepository.GetAllAsync();
    }
    
    // GET api/absence-requests/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AbsenceRequest>> GetRequestById(Guid id)
    {
        var request = await _absenceRepository.GetRequestById(id);
        if (request == null)
        {
            Console.WriteLine("not found");
            return NotFound();
        }
        return Ok(request);
    }
    
    /* TODO: GET api/absence-requests/{employee-id}
     [HttpGet("{employee-id}")]
     public async Task<ActionResult<AbsenceRequest>> GetRequestByEmployeeId(
        int employeeId
    ) 
     {}
     */
    
    // POST api/absence-requests
    [HttpPost]
    public async Task<ActionResult<AbsenceRequest>> Post(
        [FromBody] AbsenceRequest request
    )
    {
        if (request is null)
        {
            return BadRequest();
        }

        await _absenceRepository.AddAsync(request);
        return Created($"/api/absence-requests/{request.Id}", request);
    }
    
    // TODO: PUT api/absence-requests/{id}
}