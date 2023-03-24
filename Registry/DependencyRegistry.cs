using Microsoft.Extensions.DependencyInjection;
using Services.Telemetry;
using Shared.Configuration;
using Shared.Telemetry;

namespace Registry;

public class DependencyRegistry : IDependencyRegistry
{
    public void Register(IServiceCollection services)
    {
        services.AddSingleton<ITelemetryService, TelemetryService>();
        services.AddSingleton<ITelemetryGateway, TelemetryGateway>();
    }
}
