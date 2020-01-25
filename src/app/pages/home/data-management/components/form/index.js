import React from 'react';
import { useDispatch } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DATA_TYPES } from '../../../../../constants';
import Modal from 'react-bootstrap/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    //width: "100%",
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  //snackBar custom style class
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    marginTop: '10px',
    marginBottom: '0px'
  },
  formControl: {
    marginTop: '10px',
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export const Form = props => {
  const { name, formData, currentListing, label, data_type: type, actions, onHide, handleChangeText, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const getField = () => {
    const { field, actions, onHide, handleChangeText, ...rest } = props;
    const { name, label, data_type: type, options_list } = field || {};
    const fieldName = name && name.trim().toLowerCase().replace(" ", "_");
    const data = {
      name,
      label,
      value: currentListing[fieldName],
      onChange: (value) => handleChangeText(value, fieldName)
    };
    switch (type) {
      case DATA_TYPES.TEXT: {
        return (
          <TextField
            id="dynamicField"
            {...data}
            className={classes.textField}
            margin="normal"
            // variant="outlined"
          />
        );
      }
      case DATA_TYPES.DATE: {
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            {...data}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            />
            </MuiPickersUtilsProvider>
        );
      }
      case DATA_TYPES.ARRAY: {
        return (
          <FormControl className={classes.formControl}>
            <FormHelperText style={{ fontSize: 12 }}>{name}</FormHelperText>
            <Select
              {...data}
              inputProps={{
                name: 'max-width',
                id: 'max-width'
              }}
            >
              {options_list && options_list.map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
          </FormControl>
        );
      }
      default:
        return null;
    }
  };

  const handleSubmitModal = () => {
    dispatch(
      actions.addField({
        field_name: 'Invoive To',
        field_label: 'Invoive To',
        data_type: 'text',
        step_token: 1
      })
    );
    // onExit(modalText);
    // onHide();
  };

  const inputfield = getField();
  return (
    <Grid
      xs={6}
      sm={3}
      lg={6}
      style={{
        marginLeft: 10,
        maxWidth: '23%'
      }}
    >
      {inputfield}
    </Grid>
  );
};
{
  /* <TextField
  id="dynamicField"
  label="Label"
  defaultValue={modalText}
  className={classes.textField}
  margin="normal"
  variant="outlined"
  onChange={handleChangeText}
/>
<FormControl className={classes.formControl}>
  <FormHelperText style={{ fontSize: 12 }}>Type</FormHelperText>
  <Select
    value="text"
    onChange={() => {}}
    inputProps={{
      name: 'max-width',
      id: 'max-width'
    }}
  >
    <MenuItem value="text">Text</MenuItem>
    <MenuItem value="date">Date</MenuItem>
    <MenuItem value="array">array</MenuItem>
    <MenuItem value="radio">radio</MenuItem>
    <MenuItem value="checkbox">checkbox</MenuItem>
  </Select>
</FormControl> */
}
