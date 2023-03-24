﻿using Shared.Telemetry;
using API.Requests.Telemetry;
using API.Shared;

namespace API.Handlers;

public class LatestValuesHandler : IStandardHandler<LatestValuesRequest, IEnumerable<TelemetryData>>
{
    private readonly ITelemetryService _telemetryService;

    public LatestValuesHandler(ITelemetryService telemetryService)
    {
        _telemetryService = telemetryService;
    }

    public async Task<StandardResult<IEnumerable<TelemetryData>>> Handle(LatestValuesRequest request, CancellationToken cancellationToken)
    {
        return new StandardResult<IEnumerable<TelemetryData>>(true)
        {
            Result = await _telemetryService.GetLatestValues()
        };
    }

}
