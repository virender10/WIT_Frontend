import React from 'react';
import { useDispatch } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import DatePickerEx from '../../../../customs/CustomDatePicker';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
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
  FormHelperText,
  FormGroup
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { DATA_TYPES } from '../../../../../constants';
import CustomCheckBox from '../../../../customs/CustomCheckBox';
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
  const {
    name,
    formData,
    currentListing,
    label,
    data_type: type,
    actions,
    onHide,
    handleChangeText,
    field,
    ...rest
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const renderSubOptions = (suboptionsObj, data) => {
    if (!!suboptionsObj) {
      const keys = Object.keys(suboptionsObj);
      for (let k of keys) {
        const options = suboptionsObj[k].options;
        const fieldName = k.toLowerCase()
          const dataObj = {
            selectedValue: formData[fieldName] || '',
            value: formData[fieldName] || '',
            name: fieldName,
            label: k.label,
            onChange: value => handleChangeText(value, fieldName)
          }
        return renderCheckbox(options, dataObj)
      }
    }
    return null;
  }

  const renderCheckbox = (options_list, data) => {
    const { field, actions, onHide, handleChangeText, ...rest } = props;
    const { name, label, data_type: type, suboptions_list } = field || {};
    const fieldName =
      name &&
      name
        .trim()
        .toLowerCase()
        .replace(' ', '_');
    const options = Object.keys(options_list);
    const dataObj = {
      name,
      selectedValue: formData[fieldName] || '',
      ...data,
    }
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup aria-label="position" row>
          <div>
            {options.map((a, index) => (
              <>
                <CustomCheckBox
                  className="checkBoxClass"
                  key={index}
                  issingle="true"
                  {...dataObj}
                  value={a}
                />
                <label
                  style={{
                    paddingRight: '20px',
                    paddingLeft: '5px'
                  }}
                  className="label-class"
                >
                  {options_list[a]}
                </label>
              </>
            ))}
          </div>
        </FormGroup>
      </FormControl>
    );
  }

  const getField = () => {
    const { field, actions, onHide, handleChangeText, ...rest } = props;
    const { name, label, data_type: type, options_list, suboptions_list } = field || {};
    const fieldName =
      name &&
      name
        .trim()
        .toLowerCase()
        .replace(' ', '_');
    const data = {
      name,
      label,
      value: formData[fieldName] || '',
      onChange: value => handleChangeText(value, fieldName)
    };

    switch (type) {
      case DATA_TYPES.TEXT: {
        return (
          <TextField
            id={label}
            {...data}
            className={classes.textField}
            margin="normal"
            // variant="outlined"
          />
        );
      }
      case DATA_TYPES.DATE: {
        return (
          <div
            style={{
              paddingTop: 10
            }}
          >
            <DatePickerEx value={data.value} {...data} />
          </div>
        );
      }
      case DATA_TYPES.RADIO: {
        const options = Object.keys(options_list);
        const suboptionsObj = data.value && suboptions_list && suboptions_list[data.value];
        return (
          <>
            <FormLabel component="legend">{label}</FormLabel>
            {options &&
              options.map(o => (
                <label>
                  <Radio
                    checked={data.value === o}
                    {...data}
                    value={o}
                    inputProps={{ 'aria-label': options_list[o] }}
                    label={options_list[o]}
                  />
                  {options_list[o]}
                </label>
              ))}
            {data.value && suboptionsObj && renderSubOptions(suboptionsObj, data)}
          </>
        );
      }
      case DATA_TYPES.CHECKBOX: return renderCheckbox(options_list, data)
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
              {options_list &&
                options_list.map(option => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
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
      item
      xs={12}
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
