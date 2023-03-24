using MediatR;
using Shared.Telemetry;
using API.Shared;

namespace API.Requests.Telemetry;

public class LatestValuesRequest : IStandardRequest<IEnumerable<TelemetryData>>
{
}
