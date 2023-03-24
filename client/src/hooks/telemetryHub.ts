import { HubConnection } from '@microsoft/signalr';
import { useEffect } from 'react';
import { getSignalRConnection } from '@/utilities/signalr';
import { useAppDispatch } from '@/app/hooks';
import { toast } from '@/app/appSlice';
import { telemetryReceived } from '@/pages/home/reducers/telemetrySlice';

export const useTelemetryHub = (connect: boolean) => {
  let connection: HubConnection;
  const dispatch = useAppDispatch();
  let received = false;

  
  useEffect(() => {

    if (!connect) {
      return;
    }

    async function subscribe() {
      connection = await getSignalRConnection('/signalr/telemetry');

      connection.on('subscribed', (response: string) => {
        console.log(response);

        dispatch(toast({
          message: response,
          type: 'success'
        }));

      });

      connection.on('telemetry', (telemetryData: TelemetryData[]) => {
        if (!received) {
          received = true;
          dispatch(toast({
            message: 'Receiving data...',
            type: 'info'
          }));
        }
        dispatch(telemetryReceived(telemetryData));
      })

      await connection.invoke('subscribe');
    }

    subscribe();

    return () => {
      if (connection) {
        connection.invoke('unsubscribe').then(() => {
          connection.off('subscribed');
          connection.off('telemetry');

          const message = 'Unsubscribed from Telemetry Hub'; 

          console.log(message);

          dispatch(toast({
            message,
            type: 'success'
          }));

        });
      }
    }

  }, [connect]);

}