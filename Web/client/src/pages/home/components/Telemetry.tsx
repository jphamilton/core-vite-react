import { NavLink } from 'react-router-dom';
import { useLatestValues, useTelemetryHub } from '@/services/telemetryService';
import { Loader } from '@/components';
import { formatDateTime } from '@/utilities/datetime';

export const Telemetry = () => {
  // get latest values
  const { result, error, loading, ready } = useLatestValues();

  // then subscribe to telemetry via signalR
  const telemetry = useTelemetryHub();

  // prefer telemetry
  const data = telemetry || (ready ? result : null);

  return (
    <>
    <p>
      <NavLink to='/home/counter'>Counter</NavLink>
    </p>
      {
        !!error
          ? <div>An error occurred</div>
          : loading ? <Loader size={5} overlay={true} />
            : data ? <TelemetryTable data={data} />
              : <div />
      }
    </>
  );

};

const TelemetryTable = (props: { data: TelemetryData[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={4}>Telemetry Data (Updated every 5 sec)</th>
        </tr>
        <tr>
          <th>TImestamp</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, i) =>
          <tr key={`telemetry-${i}`}>
            <td>{formatDateTime(data.date)}</td>
            <td>{data.temperatureC}</td>
            <td>{data.temperatureF}</td>
            <td>{data.summary}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}