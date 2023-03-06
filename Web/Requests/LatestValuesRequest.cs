using MediatR;
using Shared.Telemetry;

namespace Web.Requests
{
    public class LatestValuesRequest : IRequest<IEnumerable<TelemetryData>>
    {
    }
}
