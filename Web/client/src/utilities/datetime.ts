import dayjs from 'dayjs';

export function formatDateTime(date: Date): string {
  return !!date ? dayjs(date).format('MMM-DD-YYYY HH:mm:ss') : '';
}