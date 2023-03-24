using Shared.Telemetry;

namespace Services.Telemetry;

// In real life, imagine this is a MassTransit Consumer connected to
// RabbitMQ or something similar. With realtime data flowing in...
public class TelemetryGateway : ITelemetryGateway
{
    private readonly List<IObserver<TelemetryData[]>> observers = new();
    private readonly ITelemetryService telemetryService;

    public TelemetryGateway(ITelemetryService telemetryService)
    {
        var timer = new Timer(OnTimerAsync, null, 5000, 5000);
        this.telemetryService = telemetryService;
    }

    private async void OnTimerAsync(object? state)
    {
        if (observers.Any())
        {
            var data = await telemetryService.GetLatestValues();

            foreach (var observer in observers)
            {
                observer.OnNext(data.ToArray());
            }
        }
    }

    public IDisposable Subscribe(IObserver<TelemetryData[]> observer)
    {
        if (!observers.Contains(observer))
        {
            observers.Add(observer);
        }

        return new Unsubscriber(observers, observer);
    }

    private class Unsubscriber : IDisposable
    {
        private readonly List<IObserver<TelemetryData[]>> _observers;
        private readonly IObserver<TelemetryData[]> _observer;

        public Unsubscriber(List<IObserver<TelemetryData[]>> observers, IObserver<TelemetryData[]> observer)
        {
            _observers = observers;
            _observer = observer;
        }

        public void Dispose()
        {
            if (!(_observer == null))
            {
                _observers.Remove(_observer);
            }
        }
    }
}
