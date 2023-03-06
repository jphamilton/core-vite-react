using System.Collections.Concurrent;

namespace Web.Hubs
{
    public class HubSubscriptions
    {
        private readonly ConcurrentDictionary<string, IDisposable> subscriptions = new();
    
        public bool Has(string id)
        {
            return subscriptions.ContainsKey(id);
        }

        public void Add(string id, IDisposable subscription)
        {
            subscriptions.TryAdd(id, subscription);
        }

        public void Remove(string id)
        {
            if (subscriptions.TryRemove(id, out var subscription))
            {
                subscription.Dispose();
            }
        }
    }

}
