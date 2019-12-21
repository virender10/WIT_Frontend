import React, { useEffect } from "react";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Thumb from '../../../customs/ImageUploader';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from "../../../customs/SnackBar";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import CustomCheckBox from "../../../customs/CustomCheckBox";
import {
  saveUser,
  updateUser,
  getRoles
} from "../../../../services/authService";
import { getUserById } from "../../../../services/userManagementService";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
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
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

const roles = [
  {
    value: "1",
    label: "Administrator"
  },
  {
    value: "2",
    label: "Guest"
  },
  {
    value: "3",
    label: "Manager"
  },
  {
    value: "4",
    label: "Field Offices"
  }
];

const getInitialValue = value => {
  if (value) return value;
  return {
    first_name: "",
    last_name: "",
    email: "",
    companyName: "",
    phone: "",
    role: "",
    file: null,
    user_management:[],
    data_management:[]
  };
};


const CreateNewUser = ({
  history,
  pathname,
  match: {
    params: { id }
  }
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackmsg, setSnackmsg] = React.useState('');

  useEffect(() => {
    //     getRoles().then(({data}) => {
    // debugger
    //     });
    if (id)
      getUserById(id)
        .then(({ data }) => {
          debugger
          if (data.status == 200) {
            setValue(data.userdata)
          } else {
            alert(data.status + ' ' + data.response);
          }
        })
        .catch(error => setError(error));

  }, [id]);

  //snackbar Handlers
  const handleClick = () => {
    setOpen(true);
    //snackmsg(content)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  //snackbar Handler Close

  if (error) return null;
  const userMutation = id ? updateUser : saveUser;

  return (
    <>
      <div className="kt-portlet kt-portlet--height-fluid">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
              {id ? "Update" : "Create"}
            </h3>
          </div>
          <div className="kt-portlet__head-toolbar">
            <Link to="/user-management/Users/UserList">
              <Tooltip
                TransitionComponent={Zoom}
                title="Back to the users list"
                placement="bottom"
              >
                <Button
                  size="large"
                  variant="contained"
                  style={{ marginRight: "8px" }}
                >
                  Back
                </Button>
              </Tooltip>
            </Link>

            {/* <Tooltip TransitionComponent={Zoom} title="Reset Changes" placement="bottom">
                            <Button type="reset" size="large" variant="contained" style={{marginRight : "8px"}}>Reset</Button>
                        </Tooltip> */}
            {/* <Tooltip TransitionComponent={Zoom} title="Save User" placement="bottom">
                            <Button size="large" variant="contained" style={{ backgroundColor: '#5d78ff' }} color="primary" href="#save">
                                Save
                        </Button>
                        </Tooltip> */}
          </div>
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget4">
            <Formik
              initialValues={getInitialValue(value)}
              enableReinitialize
              validate={values => {
                const errors = {};
                if (!values.first_name) {
                  errors.first_name = "Required Field";
                }
                if (!values.last_name) {
                  errors.last_name = "Required Field";
                }
                if (!values.email) {
                  errors.email = "Required Field";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid Field";
                }
                //Australian Phone Number Regex
                // if (!/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i.test(values.phone)) {
                //   errors.phone = "Invalid Phone Number";
                // }

                return errors;
              }}
              onSubmit={values => {
                console.log(values, "hgdgtdfd")
                userMutation(values)
                  .then(data => {

                    console.log("user create data: ", data)
                    debugger
                    console.log(id);
                    //id? handleClick(): alert("successfull registration");
                    //handleClick();
                    // if (data.status == 200) {

                    // } else {
                    //   alert("something went wrong");
                    // }
                  })
                  .catch(() => {
                    alert("something went wrong");
                  });
              }}
            >
              {({
                values,
                status,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => {
                return (
                  <form
                    noValidate={true}
                    autoComplete="off"
                    className="kt-form"
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="First Name"
                          margin="normal"
                          name="first_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.first_name}
                          helperText={touched.first_name && errors.first_name}
                          error={Boolean(touched.first_name && errors.first_name)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="LastName"
                          margin="normal"
                          name="last_name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.last_name}
                          helperText={touched.last_name && errors.last_name}
                          error={Boolean(touched.last_name && errors.last_name)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          type="email"
                          label="Email"
                          margin="normal"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          helperText={touched.email && errors.email}
                          error={Boolean(touched.email && errors.email)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          id="select-role"
                          select
                          label="Select Role"
                          value={values.role}
                          className={classes.textField}
                          name="role"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          helperText="Please select user role"
                          margin="normal"
                        >
                          {roles.map(option => (
                            <MenuItem key={option.value} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Phone"
                          margin="normal"
                          className="kt-width-full"
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          helperText={touched.phone && errors.phone}
                          error={Boolean(touched.phone && errors.phone)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        {/* <input className={classes.input} id="file" type="file" name="file" onChange={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }} /> */}
                        <input id="file" name="file" type="file" onChange={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }} className="form-control" />
                        <Thumb file={values.file} />
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        {/* <FormLabel component="legend"><CustomCheckBox name="um" value="is_um"/>User Management</FormLabel> */}
                        <FormGroup aria-label="position" row>
                          {/* <CustomCheckBox name="user_management" value="um_create" label="Create" />
                          <CustomCheckBox name="user_management" value="um_edit" label="Edit" />
                          <CustomCheckBox name="user_management" value="um_delete" label="Delete" />
                          <CustomCheckBox name="user_management" value="um_list" label="List" /> */}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        {/* <FormLabel component="legend"><CustomCheckBox name="um" value="is_um"/>User Management</FormLabel> */}
                        {/* <FormGroup aria-label="position" row>
                          <CustomCheckBox name="data_management" value="dm_create" label="Create" />
                          <CustomCheckBox name="data_management" value="dm_edit" label="Edit" />
                          <CustomCheckBox name="data_management" value="dm_delete" label="Delete" />
                          <CustomCheckBox name="data_management" value="dm_list" label="List" />
                        </FormGroup> */}
                      </FormControl>
                    </Grid>


                    <div className="kt-login__actions">
                      <button
                        id="kt_login_signin_submit"
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary btn-elevate kt-login__btn-primary"
                      >
                        {id ? ('Update') : ('Register')}
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>

          </div>

        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <SnackBarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Success"
        />
      </Snackbar>
    </>
  );
};

export default withRouter(CreateNewUser);
