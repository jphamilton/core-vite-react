using Web.Requests;
using Web.Shared;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Shared.Telemetry;

namespace Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TelemetryController : StandardController
    {

        public TelemetryController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet(Name = "GetLatestValues")]
        public async Task<StandardResult<IEnumerable<TelemetryData>>> Get()
        {
            return await Send(new LatestValuesRequest());
        }
    }
}