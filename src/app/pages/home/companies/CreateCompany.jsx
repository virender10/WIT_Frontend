import React, { useEffect } from "react";
import { compose } from "redux";
import { useDispatch } from "react-redux"
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from "../../customs/SnackBar";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import {
  saveUser,
  updateUser,
  getRoles
} from "../../../services/authService";
import { actions } from "../../../store/ducks/user.duck"
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


const getInitialValue = value => {
  if (value) return value;
  return {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    companyName: "",
    phone: "",
    filename: "",
    role: "",
    file: null,
    user_management:[],
    data_management:[]
  };
};


const CreateNewUser = ({
  history,
  match: {
    params: { id }
  },
  users,
  currentUser
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const [error] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    //console.log('useEffect has been called!');
    getRoles()
      .then(response => {
        const roleArray = response.data.data;
        setRoles(roleArray);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    if (id) {
      const selectedUser = users.find(user => user.userid === Number(id));
        if (selectedUser) setValue({...selectedUser, role: selectedUser.role_id, file: { data: selectedUser.image } })
    } else if (currentUser) {
      setValue(currentUser)
    }

      // getUserById(id)
      //   .then(({ data }) => {
      //     if (data.status == 200) {
      //       setValue(data.userdata)
      //     } else {
            
      //     }
      //   })
      //   .catch(error => setError(error));

  }, [id, currentUser]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (error) return null;
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
          </div>
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget4">
            <Formik
              initialValues={getInitialValue(value)}
              enableReinitialize
              validate={values => {
                const errors = {};
                if (!id) dispatch(actions.setCurrentUser(values));
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
                return errors;
              }}
              onSubmit={values => {
                const functionToCall = id ? "editUser" : "createUser";
                if (id) {
                  values["userid"] = id
                }
                dispatch(actions[functionToCall]({ values, callback: () => history.push('/user-management/Users/UserList')}));
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting              }) => {
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
                          label="Last Name"
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
                      {!id && <Grid item xs={6} sm={3}>
                        <TextField
                          type="password"
                          label="Password"
                          margin="normal"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          helperText={touched.password && errors.password}
                          error={Boolean(touched.password && errors.password)}
                        />
                      </Grid>}
                      <Grid item xs={6} sm={3}>
                        <TextField
                          id="select-role"
                          select
                          label="Select Role"
                          value={values.role || ""}
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
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
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
                      {/* <Grid item xs={6} sm={3}>
                        <input id="file" name="file" type="file" onChange={(event) => {
                          const filename = event.target.value;
                          setFieldValue("file", { data: event.currentTarget.files[0], filename });
                        }} className="form-control" />
                        <Thumb id={id} actions={actions} values={values} filename={values.file && values.file.filename} currentUser={currentUser || {}} file={values.file && values.file.data} />
                      </Grid> */}
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
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

const mapStateToProps = store => ({
  users: store.users.userList,
  currentUser: store.users.currentUser
});

export default compose(connect( mapStateToProps), withRouter)(CreateNewUser);
