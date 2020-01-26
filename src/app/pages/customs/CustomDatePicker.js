import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

const CustomDatePicker = ({ label, name, formData,  value, onChange, ...rest }) => {
  //// debugger
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const dateValue = value ? new Date(value) : new Date();
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          clearable
          label={label}
          name={name}
          value={dateValue}
          placeholder="dd/MM/yyyy"
          onChange={date => onChange(new Date(date))}
          format="dd/MM/yyyy"
          style={{
            width: '100%'
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default CustomDatePicker;
