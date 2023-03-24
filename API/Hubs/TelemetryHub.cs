using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Shared.Telemetry;

namespace API.Hubs;

[Authorize]
public class TelemetryHub : SubscriptionHub
{
    private readonly ITelemetryGateway _gateway;

    public TelemetryHub(ITelemetryGateway gateway)
    {
        _gateway = gateway;
    }

    protected override IDisposable OnSubscribe(ISingleClientProxy client)
    {
        var subscriber = new HubSubscriber<TelemetryData[]>(client, "telemetry");
        var subscription = _gateway.Subscribe(subscriber);
        client.SendAsync("subscribed", $"Subscribed to Telemetry Hub");
        return subscription;
    }
}
