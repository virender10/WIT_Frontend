import React from 'react';
import { useDispatch } from "react-redux"
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
  const [modalText, setmodalText] = React.useState('');

  const handleChangeText = event => {
    setmodalText(event.target.value);
    if (event.target.value.length > 0) {
      setChange(false);
    } else {
      setChange(true);
    }
  };

    const handleSubmitModal = () => {
    dispatch(actions.addField({ field_name: "Invoive To", field_label: "Invoive To", data_type: "text", step_token: 1 }))
    // onExit(modalText);
    // onHide();
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
              defaultValue={modalText}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleChangeText}
            />
            <TextField
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
