import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  //LogLevel,
  IHttpConnectionOptions,
  HttpTransportType
} from '@microsoft/signalr';

//const isDev = process.env.NODE_ENV === 'development';

const startSignalRConnection = async (connection: any) => {
  try {
    await connection.start();
    console.assert(connection.state === HubConnectionState.Connected);
    console.log('SignalR connection established');
  } catch (err) {
    console.assert(connection.state === HubConnectionState.Disconnected);
    console.error('SignalR Connection Error: ', err);
    setTimeout(() => startSignalRConnection(connection), 5000);
  }
};

export const getSignalRConnection = async (connectionHub: string) => {

  const options: IHttpConnectionOptions = {
    //logMessageContent: isDev,
    //logger: isDev ? LogLevel.Warning : LogLevel.Error,
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
    //accessTokenFactory: () => getAccessToken(getState())
  };

  const connection = new HubConnectionBuilder()
    .withUrl(connectionHub, options)
    .withAutomaticReconnect()
    .withHubProtocol(new JsonHubProtocol())
    //.configureLogging(LogLevel.Information)
    .build();

  // Note: to keep the connection open the serverTimeout should be
  // larger than the KeepAlive value that is set on the server
  // keepAliveIntervalInMilliseconds default is 15000 and we are using default
  // serverTimeoutInMilliseconds default is 30000 and we are using 60000 set below
  connection.keepAliveIntervalInMilliseconds = 15000;
  connection.serverTimeoutInMilliseconds = 60000;

  // re-establish the connection if connection dropped
  connection.onclose(error => {
    console.assert(connection.state === HubConnectionState.Disconnected);
    if (!!error) {
      console.log('SignalR: connection was closed due to error.', error);
    } else {
      console.log('SignalR: connection was closed.');
    }
  });

  connection.onreconnecting(error => {
    console.assert(connection.state === HubConnectionState.Reconnecting);
    console.log('SignalR: connection lost due. Reconnecting...', error);
  });

  connection.onreconnected(connectionId => {
    console.assert(connection.state === HubConnectionState.Connected);
    console.log('SignalR: connection reestablished. Connected with connectionId', connectionId);
  });

  
  await startSignalRConnection(connection);

  return connection;

};
