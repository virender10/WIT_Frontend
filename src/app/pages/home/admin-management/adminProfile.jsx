import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from 'formik';
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import {updateUser} from '../../../services/userManagementService';

const useStyles = makeStyles(theme => ({
  customroot: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
  bigAvatar: {
    width: 100,
    height: 100,
  },
}));

const getInitialValue = value => {
  if (value) return value;
  return {
    userid:"",
    first_name: "",
    last_name: "",
    email: "",
    image: null,
    role_name: "",
    role_id: "",
    phone: ""
  };
};

const AdminProfile = (props) => {
  const { user } = props;
  console.log(user);
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    setValue(user);
  }, []);

  return (
    <>
      <div className={`kt-container kt-container--fluid kt-grid__item kt-grid__item--fluid ${classes.customroot}`}>
        <div className="kt-portlet kt-portlet--height-fluid">
          <div className="kt-portlet__head">
            <div className="kt-portlet__head-label">
              <h3 className="kt-portlet__head-title">My Profile</h3>
            </div>
            <div className="kt-portlet__head-toolbar">
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
                  // //Australian Phone Number Regex
                  if (
                    !/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i.test(
                      values.phone
                    )
                  ) {
                    errors.phone = "Invalid Phone Number";
                  }

                  return errors;
                }}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                  setTimeout(() => {
                    updateUser(values.userid,values.first_name,values.last_name,values.phone)
                      .then(({ data: { userdata }}) => {
                        debugger
                        console.log(userdata);
                        // accessToken
                      })
                      .catch(() => {
                        setSubmitting(false);
                        // setStatus(
                        //   intl.formatMessage({
                        //     id: "AUTH.VALIDATION.INVALID_LOGIN"
                        //   })
                        // );
                      });
                  }, 1000);
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
                  isSubmitting
                }) => {
                  return (
                    <form
                      noValidate={true}
                      autoComplete="off"
                      className="kt-form"
                      onSubmit={handleSubmit}
                    >
                      <Grid container spacing={3}>
                      <input type="hidden" id="userid" name="userid" value={values.userid}/>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            label="FirstName"
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
                            label="Email"
                            margin="normal"
                            name="email"
                            value={values.email}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                        <Avatar alt="Remy Sharp" src={values.image} className={classes.bigAvatar} />
                          {/* <img src={thumb}
                            alt={file.name}
                            className="img-thumbnail mt-2"
                            height={200}
                            width={200} /> */}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            label="Phone"
                            margin="normal"
                            name="phone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            helperText={touched.phone && errors.phone}
                            error={Boolean(touched.phone && errors.phone)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            label="Role"
                            margin="normal"
                            name="role_name"
                            onBlur={handleBlur}
                            value={values.role_name}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                      <div className="kt-login__actions">
                        <button
                          id="kt_login_signin_submit"
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary btn-elevate kt-login__btn-primary"
                        >
                          Update
                      </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps)(AdminProfile);