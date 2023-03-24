using API.Shared;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

public class HubSubscriber<T> : IObserver<T>
{
    private readonly ISingleClientProxy _client;
    private readonly string _method;


    public HubSubscriber(ISingleClientProxy client, string method)
    {
        _client = client;
        _method = method;
    }

    public void OnCompleted() {}

    public void OnError(Exception error) { }

    public void OnNext(T value)
    {
        try
        {
            _client.SendAsync(_method, value);
        }
        catch
        {
            // this isn't a life support monitor
        }
    }
}
