using Microsoft.AspNetCore.SignalR;

namespace Web.Hubs
{
    public abstract class SubscriptionHub : Hub
    {
        private static readonly HubSubscriptions subscriptions = new();

        protected abstract IDisposable OnSubscribe(ISingleClientProxy client);

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            base.OnDisconnectedAsync(exception);
            return Unsubscribe();
        }

        public Task Subscribe()
        {
            var id = Context.ConnectionId;

            if (!subscriptions.Has(id))
            {
                var client = Clients.Client(id);

                if (client != null)
                {
                    var subscription = OnSubscribe(client);
                    subscriptions.Add(id, subscription);
                }
            }

            return Task.CompletedTask;
        }

        public Task Unsubscribe()
        {
            var id = Context.ConnectionId;

            subscriptions.Remove(id);

            Clients.Client(id).SendAsync("unsubscribed", $"Unsubscribed from Telemetry: ${id}");

            return Task.CompletedTask;
        }
    }

}
