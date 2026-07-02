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
    
    // PUT api/absence-requests/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<AbsenceRequest>> UpdateRequestById(Guid id, [FromBody] AbsenceRequest request)
    {
        if (request == null)
        {
            Console.WriteLine("not found");
            return NotFound();
        }

        await _absenceRepository.UpdateAsync(id, request);
        return Accepted($"/api/absence-requests/{request.Id}", request);
    }
    
    // DELETE api/absence-requests/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult<AbsenceRequest>> DeleteRequestById(Guid id)
    {
        var request = await _absenceRepository.GetRequestById(id);
        if (request == null)
        {
            Console.WriteLine("not found");
            return NotFound();
        }

        await _absenceRepository.RemoveAsync(id);
        return NoContent();        
    }
}