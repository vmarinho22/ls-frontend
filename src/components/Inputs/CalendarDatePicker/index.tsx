import { Input } from '@chakra-ui/react';
import { FC } from 'react';

const CalendarDatePicker: FC<any> = ({
  openCalendar,
  value,
  handleValueChange,
}) => {
  return (
    <Input
      width="100%"
      onFocus={openCalendar}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default CalendarDatePicker;
