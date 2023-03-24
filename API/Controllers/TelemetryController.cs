using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Requests.Telemetry;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class TelemetryController : StandardController
{
    public TelemetryController(ISender sender) : base(sender)
    {
    }

    [Authorize]
    [HttpGet(Name = "GetLatestValues")]
    public async Task<IActionResult> Get()
    {
        return await Send(new LatestValuesRequest());
    }
}