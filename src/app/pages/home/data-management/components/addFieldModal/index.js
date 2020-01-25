import React from 'react';
import { useDispatch } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { DATA_TYPES } from '../../../../../constants';

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

export const AddFieldModal = props => {
  const { onHide, onExit, actions, activeStep, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [change, setChange] = React.useState(true);
  const [field, setField] = React.useState({});
  const [modalText, setmodalText] = React.useState('');

  const handleChangeText = event => {
    if (!field[event.target.name])
      field[event.target.name] = event.target.value;
    else field[event.target.name] = event.target.value;
    setField(field);
  };

  const handleSubmitModal = () => {
    dispatch(
      actions.addField({
        field_name: field.name,
        field_label: field.label,
        data_type: field.type,
        step_token: activeStep + 1,
        options_list: null
      })
    );
    setField({});
    // onExit(modalText);
    onHide();
    // setmodalText('');
  };

  const handleClose = () => {
    onHide();
    setmodalText('');
  };

  return (
    <Modal
      {...rest}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Add your field.....
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="dynamicField"
              label="Name"
              name="name"
              value={field.name}
              defaultValue={modalText}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleChangeText}
            />
            <TextField
              id="dynamicField"
              label="Label"
              name="label"
              value={field.label}
              defaultValue={modalText}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleChangeText}
            />
            <FormControl className={classes.formControl}>
              <FormHelperText style={{ fontSize: 12 }}>Type</FormHelperText>
              <Select
                name="type"
                onChange={handleChangeText}
                inputProps={{
                  name: 'type',
                  id: 'type'
                }}
                value={field.type}
              >
                <MenuItem value={DATA_TYPES.TEXT}>Text</MenuItem>
                <MenuItem value={DATA_TYPES.DATE}>Date</MenuItem>
                <MenuItem value={DATA_TYPES.ARRAY}>Rrray</MenuItem>
                <MenuItem value={DATA_TYPES.RADIO}>radio</MenuItem>
                <MenuItem value={DATA_TYPES.CHECKBOX}>Checkbox</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitModal}
          disabled={false}
        >
          Save
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
