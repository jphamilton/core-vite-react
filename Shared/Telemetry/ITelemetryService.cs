namespace Shared.Telemetry;

public interface ITelemetryService
{
    Task<IEnumerable<TelemetryData>> GetLatestValues();
}
