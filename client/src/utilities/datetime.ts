import dayjs from 'dayjs';

export function formatDateTime(date: Date | string): string {
  return !!date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '';
}