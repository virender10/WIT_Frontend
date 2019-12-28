import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EnhancedRoleTable from "../../../customs/RoleTable";
import Modal from "react-bootstrap/Modal";
import { getRoles } from "../../../../services/authService";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const MyVerticallyCenteredModal = ({ onHide, onExit, ...rest }) => {
  const classes = useStyles();
  const [change, setChange] = React.useState(true);
  const [modalText, setmodalText] = React.useState("");

  const handleChangeText = event => {
    setmodalText(event.target.value);
    if (event.target.value.length > 0) {
      setChange(false);
    } else {
      setChange(true);
    }
  };

  const handleSubmit = () => {
    onExit(modalText);
    onHide();
    setmodalText("");
  };

  const handleClose = () => {
    onHide();
    setmodalText("");
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
        <Modal.Title id="contained-modal-title-vcenter">New Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="role"
              label="Role"
              defaultValue={modalText}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handleChangeText}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={change}
        >
          Save
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const RoleList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect has been called!');
    getRoles()
      .then(data => {
        const roleArray = Object.keys(data.data).map(i => data.data[i]);
        debugger
        setRows(roleArray);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);
    
 const addRole = title => setRows(prev => [...prev, {roleId: prev.length + 1, title}]);

  return (
    <>
      <div className="kt-portlet__head">
        <div className="kt-portlet__head-label">
          <h3 className="kt-portlet__head-title">Role List</h3>
        </div>
        <div className="kt-portlet__head-toolbar">
          {/* <Tooltip
            TransitionComponent={Zoom}
            title="Create New Role"
            placement="bottom"
          >
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#5d78ff" }}
              color="primary"
              onClick={() => setModalShow(true)}
            >
              New Role
            </Button>
          </Tooltip> */}
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onExit={addRole}
          />
        </div>
      </div>
      <div className="kt-portlet__body">
        <div className="kt-widget4">
          <EnhancedRoleTable/>
        </div>
      </div>
    </>
  );
}

export default RoleList;