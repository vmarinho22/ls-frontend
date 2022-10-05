import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export { dayjs };
