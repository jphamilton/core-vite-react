import { useEffect } from 'react';
import { formatDateTime } from '@/utilities/datetime';
import { useToast } from '@/hooks';
import { Loader } from '@/components';
import { useTelemetryHub, useLatestValues } from '@/hooks';

export const Telemetry = () => {
  // a real world scenario is that telemetry may be coming in at
  // various intervals(every 30 secs, 5 minutes, etc) so we grab
  // the latest values from the db so that the user can see
  // something
  //
  // this seems a little wonkey but this feels more composable than using
  // the thunk here
  const toast = useToast();
  const [data, loading, errors ] = useLatestValues();
  const ready = data?.length;

  useEffect(() => {
    errors.forEach(error => toast(error, 'error'));
  }, [errors]);
 
  useTelemetryHub(!!ready);

  return (
    loading ? <Loader show={true} overlay={true} size={5}  />
        : ready ?
        <div>
          <h4>Telemetry Data</h4>
          <h4>(updated every 5 sec)</h4>
          <div className='row' style={{justifyContent: 'center'}}>
            <TelemetryTable data={data} />
          </div>
        </div>  
        : <div/>
  )

};

const TelemetryTable = (props: { data: TelemetryData[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th align='right'>Sensor</th>
          <th align='right'>Value</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, i) =>
          <tr key={`telemetry-${i}`}>
            <td>{formatDateTime(data.timestamp)}</td>
            <td align='right'>{data.sensor}</td>
            <td align='right'>{data.value}</td>
            <td>{data.unit}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}