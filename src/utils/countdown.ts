import moment from 'moment';

export function getFormattedDateTime(): string {
  const now = moment();
  const day = now.format('DD');
  const month = now.format('MM');
  const year = now.format('YYYY');
  const hour = now.format('HH');
  const minute = now.format('mm');

  return `${day}/${month}/${year} - ${hour}:${minute}`;
}
