namespace Shared.Telemetry;

public interface ITelemetryGateway : IObservable<TelemetryData[]>
{
    //IDisposable Subscribe(IObserver<TelemetryData[]> observer);
}