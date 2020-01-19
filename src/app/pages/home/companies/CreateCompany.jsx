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
import { actions } from "../../../store/ducks/company.duck"
import { withRouter } from "react-router";
import Thumb from "../../customs/ImageUploader"

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
    name: "",
    description: "",
    logo: null,
    username: "",
    password: ""
  };
};


const CreateNewCompany = ({
  history,
  match: {
    params: { id }
  },
  companies,
  currentCompany
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);
  const [error] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (id) {
      const selectedCompany = companies.find(c => c.id === Number(id));
      if (selectedCompany) {        
        setValue({ ...selectedCompany, logo: { data: selectedCompany.logo } })
      }
    } else if (currentCompany) {
      setValue({...currentCompany, logo: { data: currentCompany.file && currentCompany.file.data } })
    }

      // getUserById(id)
      //   .then(({ data }) => {
      //     if (data.status == 200) {
      //       setValue(data.userdata)
      //     } else {
            
      //     }
      //   })
      //   .catch(error => setError(error));

  }, [id, currentCompany]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    if (dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
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
          {id && <div className="kt-portlet__head-toolbar">
            <Link to="/company/companyList">
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
          </div>}
        </div>
        <div className="kt-portlet__body">
          <div className="kt-widget4">
            <Formik
              initialValues={getInitialValue(value)}
              enableReinitialize
              validate={values => {
                const errors = {};
                if (!id) dispatch(actions.setCurrentCompany(values));
                if (!values.name) {
                  errors.name = "Required Field";
                }
                if (!values.description) {
                  errors.description = "Required Field";
                }
                if (!values.logo) {
                  errors.logo = "Required Field";
                } 
                return errors;
              }}
              onSubmit={values => {
                const functionToCall = id ? "editCompany" : "createCompany";
                if (id) {
                  values["companyId"] = id;
                }
                if (values && values.logo && values.logo.data && !_.isObject(values.logo.data) && values.logo.data.includes("base64")) {
                  var blob = dataURLtoFile(values.logo.data, "test");
                  values.logo = { data: blob };
                }
                dispatch(actions[functionToCall]({ values, callback: () => history.push('/company/companyList')}));
              }}
            >
              {({
                values,
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
                          label="Name"
                          margin="normal"
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          helperText={touched.name && errors.name}
                          error={Boolean(touched.name && errors.name)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Description"
                          margin="normal"
                          name="description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description}
                          helperText={touched.description && errors.description}
                          error={Boolean(touched.description && errors.description)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Username"
                          margin="normal"
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.username}
                          helperText={touched.username && errors.username}
                          error={Boolean(touched.username && errors.username)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          label="Password"
                          margin="normal"
                          type="password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          helperText={touched.password && errors.password}
                          error={Boolean(touched.password && errors.password)}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} style={{
                        marginBottom: 20
                      }}>
                        <input id="logo" name="logo" type="file" onChange={(event) => {
                          const filename = event.target.value;
                          setFieldValue("logo", { data: event.currentTarget.files[0], filename });
                        }} className="form-control" />
                        <Thumb
                          id={id}
                          actions={actions}
                          values={values}
                          callAction={(data) => dispatch(actions.setCurrentCompany(data))}
                          filename={values.logo && values.logo.filename}
                          currentInProgress={currentCompany || {}}
                          file={values.logo && values.logo.data}
                        />
                      </Grid>
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
                        {id ? ('Update') : ('Create')}
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
  companies: store.companies.companyList,
  currentCompany: store.companies.currentCompany
});

export default compose(connect( mapStateToProps), withRouter)(CreateNewCompany);
