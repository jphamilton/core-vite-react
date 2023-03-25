using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

/// <summary>
/// Hub with subscription semantics
/// </summary>
public abstract class SubscriptionHub : Hub
{
    private static readonly HubSubscriptions _subscriptions = new();

    protected abstract IDisposable OnSubscribe(ISingleClientProxy client);

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        base.OnDisconnectedAsync(exception);
        return Unsubscribe();
    }

    public Task Subscribe()
    {
        var id = Context.ConnectionId;

        if (!_subscriptions.Has(id))
        {
            var client = Clients.Client(id);

            if (client != null)
            {
                var subscription = OnSubscribe(client);
                _subscriptions.Add(id, subscription);
            }
        }

        return Task.CompletedTask;
    }

    public Task Unsubscribe()
    {
        var id = Context.ConnectionId;

        _subscriptions.Remove(id);

        return Task.CompletedTask;
    }
}
