using Microsoft.AspNetCore.SignalR;
using Shared.Telemetry;

namespace Web.Hubs
{

    public class TelemetryHub : SubscriptionHub
    {
        private readonly ITelemetryGateway gateway;

        public TelemetryHub(ITelemetryGateway gateway)
        {
            this.gateway = gateway;
        }

        protected override IDisposable OnSubscribe(ISingleClientProxy client)
        {
            var subscriber = new HubSubscriber<TelemetryData[]>(client, "telemetry");
            var subscription = gateway.Subscribe(subscriber);
            client.SendAsync("subscribed", $"Subscribed to Telemetry Hub");
            return subscription;
        }
    }

}
