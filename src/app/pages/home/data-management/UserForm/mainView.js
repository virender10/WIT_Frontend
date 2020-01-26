import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { connect } from 'react-redux';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { actions } from '../../../../store/ducks/dataManagement.duck';
import { AddFieldModal } from '../components/addFieldModal';
import { Form } from '../components/form';
import FormOneFields from '../formFields/form-one.js';
import FormTwoFields from '../formFields/form-two.js';
import FormThreeFields from '../formFields/form-three.js';
import FormFourFields from '../formFields/form-four.js';
import { DATA_TYPES } from '../../../../constants';
import { Formik, Field } from 'formik';
import FormFiveFields from '../formFields/form-five.js';
import EntryForm from './Form1';
import EntryForm2 from './Form2';
import EntryForm3 from './Form3';
import EntryForm4 from './Form4';
import EntryForm5 from './Form5';
import EntryForm7 from './Form7';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  container: {
    margin: '20px'
  }
}));

function getStepContent(stepIndex, onSubmit, formData, handleChangeText) {
  // debugger
  let value = null;
  switch (stepIndex) {
    case 0:
      // return <EntryForm7/>
      value = formData['form1'];
      return (
        <EntryForm
          handleChangeText={handleChangeText}
          onSubmit={onSubmit('form1')}
          value={value}
        />
      );
    case 1:
      value = formData['form2'];
      return (
        <EntryForm2
          handleChangeText={handleChangeText}
          onSubmit={onSubmit('form2')}
          value={value}
        />
      );
    case 2:
      value = formData['form3'];
      return (
        <EntryForm3
          handleChangeText={handleChangeText}
          onSubmit={onSubmit('form3')}
          value={value}
        />
      );
    case 3:
      value = formData['form4'];
      return (
        <EntryForm4
          handleChangeText={handleChangeText}
          onSubmit={onSubmit('form4')}
          value={value}
        />
      );
    case 4:
      value = formData['form5'];
      return (
        <EntryForm5
          handleChangeText={handleChangeText}
          onSubmit={onSubmit('form5')}
          value={value}
        />
      );
    default:
      return null;
  }
}

const MainForm = props => {
  const { dataManagement, currentDataManagementSteps, currentListing } = props;
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [stepFields, setStepFields] = React.useState({});
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleChangeText = (event, name) => {
    let stepValues = currentDataManagementSteps[activeStep + 1] || {};
    const enteredvalue =
      event && event.target && event.target.name ? event.target.value : event;
    const data = {};
    data[activeStep + 1] = { ...stepValues,
      [name]: enteredvalue };
    dispatch(actions.setDataManagementSteps({ ...currentDataManagementSteps, ...data }));
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getFormData = () => {
    const data = currentDataManagementSteps;
    let obj = {};
    if (data) {
      const steps = Object.keys(data);
      steps.forEach(s => {
        obj = {
          ...obj,
          ...data[s]
        }
      })
    }

    return obj;

  }

  const handleNext = () => {
    let obj = {};
    const stepObj = Object.keys(stepFields);
    stepObj.forEach(s => {
      stepFields[s].fields.forEach(f => {
        const { name } = f;
        const fieldName =
          name &&
          name
            .trim()
            .toLowerCase()
            .replace(' ', '_');
        const data = currentDataManagementSteps[activeStep + 1];
        if (data && !!data[fieldName]) obj[fieldName] = data[fieldName];
      });
    });

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // dispatch(actions.saveFormData(getFormData()))
  };

  useEffect(() => {
    const stepFields = getFields();
    setStepFields(stepFields);
    dispatch(actions.getFormField(activeStep + 1));
  }, [activeStep]);

  const onSubmit = formName => values => {
    setFormData(prev => ({ ...prev, [formName]: values }));
    setActiveStep(prev => prev + 1);
  };

  const getFormObject = () => {
    switch (activeStep + 1) {
      case 1:
        return FormOneFields;
      case 2:
        return FormTwoFields;
      case 3:
        return FormThreeFields;
      case 4:
        return FormFourFields;
      case 5:
        return FormFiveFields;
    }
  };

  const getFields = () => {
    const formFields = getFormObject();
    const stepFieldsClone = _.cloneDeep(formFields);
    if (stepFieldsClone) {
      let updatedFields = Object.keys(stepFieldsClone);
      updatedFields.forEach(fOne => {
        const fields = stepFieldsClone[fOne].fields;
        const fieldsObjKeys = Object.keys(fields);
        stepFieldsClone[fOne]['fields'] = fieldsObjKeys.map(key => {
          return {
            ...fields[key],
            data_type: fields[key].type,
            options_list: fields[key].options || null,
            suboptions_list: fields[key].suboptions || null,
            name: key.toLowerCase()
          };
        });
      });
    }
    return stepFieldsClone;
  };

  const getSubOptions = field => {
    const options = field.options;
    let keys = {};
    if (options) {
      const subOptions = field.suboptions;
      const optionKeys = Object.keys(options);
      const previousValues = currentDataManagementSteps[activeStep + 1];
      if (optionKeys && optionKeys.length > 0) {
        optionKeys.forEach(ok => {
          if (subOptions) {
            const suboptionsObj = subOptions[ok];
            const suboptionKeys = Object.keys(suboptionsObj);
            suboptionKeys.forEach(sk => {
              keys[sk.toLowerCase()] =
                previousValues && previousValues[sk.toLowerCase()]
                  ? previousValues[sk.toLowerCase()]
                  : '';
            });
          }
        });
      }
    }

    return keys;
  };

  const getInitialValue = () => {
    let obj = {};
    const previousValues = currentDataManagementSteps[activeStep + 1];
    let updatedFields = Object.keys(stepFields);
    updatedFields.forEach(fOne => {
      const fields = stepFields[fOne].fields;
      fields.forEach(field => {
        const keys = getSubOptions(field);
        const value =
          previousValues && previousValues[field.name.toLowerCase()];
        obj = {
          ...obj,
          [field.name]: value ? value : '',
          ...keys
        };
      });
    });
    return obj;
  };

  useEffect(() => {
    dispatch(actions.getFormSteps());
    dispatch(actions.listingFormFields());
    dispatch(actions.getFormField(activeStep + 1));
  }, []);

  const headersteps = dataManagement && Object.values(dataManagement);
  let fields =
    dataManagement &&
    dataManagement[activeStep + 1] &&
    dataManagement[activeStep + 1].fields;
  const stepKeys = stepFields && Object.keys(stepFields);
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {headersteps &&
          headersteps.map(label => (
            <Step key={label.name}>
              <StepLabel>{label.name}</StepLabel>
            </Step>
          ))}
      </Stepper>
      <div>
        {activeStep === headersteps.length ? (
          <div
            style={{
              margin: 30
            }}
          >
            All steps completed
            <Button onClick={handleReset}>Submit</Button>
          </div>
        ) : (
          <>
            {stepKeys && stepKeys.length > 0 && (
              <Typography className={classes.instructions} component={'span'}>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={3}>
                      <Formik
                      initialValues={getInitialValue()}
                      validate={values => {
                        const errors = {};
                        return errors;
                        }}
                      onSubmit={values => {
                        // onSubmit(cleanInput(values));
                        }}
                      enablenableReinitialize={true}
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
                          <>
                            {stepKeys &&
                              stepKeys.map(key => {
                                const step = stepFields[key];
                                return (
                                  <>
                                    <Grid item xs={12}>
                                      {key !== 'NO_HEADING' && <h5>{key}</h5>}
                                      {step.subHeading}
                                    </Grid>
                                    {step.fields.map(f => (
                                      <Form
                                        currentListing={currentListing}
                                        formData={
                                          currentDataManagementSteps[
                                            activeStep + 1
                                          ] || {}
                                        }
                                        handleChangeText={(event, name) => {
                                          handleChange(event);
                                          handleChangeText(event, name);
                                        }}
                                        field={f}
                                      />
                                    ))}
                                  </>
                                );
                              })}
                            {fields &&
                              fields.map(f => (
                                <Form
                                  currentListing={currentListing}
                                  formData={
                                    currentDataManagementSteps[
                                      activeStep + 1
                                    ] || {}
                                  }
                                  handleChangeText={handleChangeText}
                                  field={f}
                                />
                              ))}
                          </>
                        );
                      }}
                    </Formik>
                  </Grid>
                </form>
              </Typography>
            )}
            <div
              style={{
                marginBottom: 20,
                paddingTop: 20
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === headersteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <Button
                style={{
                  float: 'right',
                  marginRight: '20px'
                }}
                color="primary"
                onClick={() => setModalShow(true)}
              >
                Add Additional Fields
              </Button>
            </div>
          </>
        )}
      </div>
      <AddFieldModal
        show={modalShow}
        activeStep={activeStep}
        actions={actions}
        onHide={() => setModalShow(false)}
        // onExit={addRole(dynamicArray)}
      />
    </div>
  );
};

const mapStateToProps = store => ({
  dataManagement: store.dataManagement.steps,
  currentDataManagementSteps: store.dataManagement.currentDataManagementSteps,
  currentListing: store.dataManagement.currentListing
});

export default connect(mapStateToProps)(MainForm);
// {activeStep === steps.length ? (
//     <div>
//         <Typography className={classes.instructions}>All steps completed</Typography>
//         <Button onClick={handleReset}>Submit</Button>
//     </div>
// ) : (
//         <div>
//             <Typography className={classes.instructions} component={'span'}>
//                 {getStepContent(activeStep, onSubmit, formData)}
//             </Typography>
//             <div>
//                 <Button
//                     disabled={activeStep === 0}
//                     onClick={handleBack}
//                     className={classes.backButton}
//                 >
//                     Back
//                 </Button>
//                 {/* <Button variant="contained" color="primary" onClick={handleNext}>
//                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                 </Button> */}
//             </div>
//             <br />
//         </div>
//     )}
