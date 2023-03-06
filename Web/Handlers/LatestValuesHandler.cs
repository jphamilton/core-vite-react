using Web.Requests;
using MediatR;
using Shared.Telemetry;

namespace Web.Handlers
{
    public class LatestValuesHandler : IRequestHandler<LatestValuesRequest, IEnumerable<TelemetryData>>
    {
        private readonly ITelemetryService telemetryService;

        public LatestValuesHandler(ITelemetryService telemetryService)
        {
            this.telemetryService = telemetryService;
        }

        public Task<IEnumerable<TelemetryData>> Handle(LatestValuesRequest request, CancellationToken cancellationToken)
        {
            return telemetryService.GetLatestValues();
        }
    }
}
