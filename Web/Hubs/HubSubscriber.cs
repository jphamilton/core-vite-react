using Web.Shared;
using Microsoft.AspNetCore.SignalR;

namespace Web.Hubs
{
    public class HubSubscriber<T> : IObserver<T>
    {
        private readonly ISingleClientProxy client;
        private readonly string method;


        public HubSubscriber(ISingleClientProxy client, string method)
        {
            this.client = client;
            this.method = method;
        }

        public void OnCompleted() {}

        public void OnError(Exception error) { }

        public void OnNext(T value)
        {
            try
            {
                client.SendAsync(method, value);
            }
            catch
            {
                // this isn't a life support monitor
            }
        }
    }

}
