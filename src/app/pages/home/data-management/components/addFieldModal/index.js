import React from 'react';
import { useDispatch } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
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
  const [arrayFields, setArrayFields] = React.useState([]);
  const [modalText, setmodalText] = React.useState('');

  // const manageArrayField = (type, index) => {
  //   switch (type) {
  //     case 'add':
  //       {
  //         setArrayFields([
  //           ...arrayFields,
  //           arrayFields[arrayFields.length - 1] + 1
  //         ]);
  //       }
  //       break;
  //     case 'delete':
  //       {
  //         const fieldIndex = arrayFields.findIndex(af => af === index);
  //         arrayFields.splice(fieldIndex, 1);
  //         delete field.option[index];
  //         setArrayFields([...arrayFields]);
  //       }
  //       break;
  //   }
  // };

  // const getArrayFields = () => {
  //   return arrayFields.map((a, index) => (
  //     <div>
  //       <TextField
  //         id="dynamicField"
  //         label="Option"
  //         name="option"
  //         value={field.option[a]}
  //         defaultValue={modalText}
  //         className={classes.textField}
  //         margin="normal"
  //         variant="outlined"
  //         onChange={event => changeOptions(event, a)}
  //       />

  //       <Fab
  //         size="small"
  //         color="secondary"
  //         aria-label="add"
  //         className={classes.margin}
  //       >
  //         <AddIcon
  //           onClick={() => manageArrayField('add', a)}
  //           fontSize="small"
  //         />
  //       </Fab>
  //       <Fab
  //         size="small"
  //         color="secondary"
  //         aria-label="add"
  //         className={classes.margin}
  //       >
  //         <DeleteIcon
  //           onClick={() => manageArrayField('delete', a)}
  //           fontSize="small"
  //         />
  //       </Fab>
  //     </div>
  //   ));
  // };

  const handleChangeText = event => {
    if (!field[event.target.name])
      field[event.target.name] = event.target.value;
    else field[event.target.name] = event.target.value;

    if (event.target.value !== DATA_TYPES.ARRAY) {
      setArrayFields([]);
    } else {
      setArrayFields([...arrayFields, 0]);
      field['option'] = { 0: '' };
    }

    setField({ ...field });
  };

  // const changeOptions = (event, id) => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   field[name] = { ...field[name], [id]: value };
  //   setField({ ...field });
  // };

  const handleSubmitModal = () => {
    const isArray = field.type === DATA_TYPES.ARRAY;

    dispatch(
      actions.addField({
        field_name: field.name,
        field_label: field.label,
        // data_type: field.type,
        data_type: DATA_TYPES.TEXT,
        step_token: activeStep + 1,
        // options_list: isArray ? Object.values(field.option) : null
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
            {/* <FormControl className={classes.formControl}>
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
                <MenuItem value={DATA_TYPES.ARRAY}>Array</MenuItem>
                <MenuItem value={DATA_TYPES.RADIO}>radio</MenuItem>
                <MenuItem value={DATA_TYPES.CHECKBOX}>Checkbox</MenuItem>
              </Select>
            </FormControl> */}
            {/* {field.type === DATA_TYPES.ARRAY && getArrayFields()} */}
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
