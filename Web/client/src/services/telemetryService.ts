import { HubConnection } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { get } from '@/utilities/http';
import { useApiAsync } from '@/hooks/useApiAsync';
import { getSignalRConnection } from './signalR';

export const getLatestValuesApi = (): StandardApiCall<TelemetryData[]> => {
  const api = async (): StandardPromise<TelemetryData[]> => {
    const response = await get<TelemetryData[]>('/api/telemetry');

    if (response.success) {
      response.result.forEach(w => w.date = new Date(w.date));
    }

    return response;
  }

  return api;
}

export const useLatestValues = (): ApiAsyncResult<TelemetryData[]> => {
  return useApiAsync<TelemetryData[]>(getLatestValuesApi());
}

export const useTelemetryHub = () => {
  let connection: HubConnection;
  const [telemetry, setTelemetry] = useState<TelemetryData[]|null>(null)

  useEffect(() => {

    async function subscribe() {
      connection = await getSignalRConnection('/signalr/telemetry');

      connection.on('subscribed', (response) => {
        console.log(response);
      });

      connection.on('telemetry', (telemetryData: TelemetryData[]) => {
        setTelemetry(telemetryData);
      })

      await connection.invoke('Subscribe');
    }

    subscribe();

    return () => {
      if (connection) {
        connection.invoke('Unsubscribe').then(() => {
          connection.stop();
        });
      }
    }

  }, []);

  return telemetry;
}