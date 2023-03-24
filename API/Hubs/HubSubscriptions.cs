using System.Collections.Concurrent;

namespace API.Hubs;

public class HubSubscriptions
{
    private readonly ConcurrentDictionary<string, IDisposable> _subscriptions = new();

    public bool Has(string id)
    {
        return _subscriptions.ContainsKey(id);
    }

    public void Add(string id, IDisposable subscription)
    {
        _subscriptions.TryAdd(id, subscription);
    }

    public void Remove(string id)
    {
        if (_subscriptions.TryRemove(id, out var subscription))
        {
            subscription.Dispose();
        }
    }
}
