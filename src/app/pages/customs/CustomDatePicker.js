import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const CustomDatePicker = ({label,name,value,...rest}) => {
    //debugger
    //const { label } = props;
    const [selectedDate, handleDateChange] = React.useState(new Date());

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    clearable
                    label = {label}
                    name = {name}
                    value={selectedDate}
                    placeholder="dd/MM/yyyy"
                    onChange={date => handleDateChange(date)}
                    //minDate={new Date()}
                    format="dd/MM/yyyy"
                />
            </MuiPickersUtilsProvider>
        </>
    )
}

export default CustomDatePicker;