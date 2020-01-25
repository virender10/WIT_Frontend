import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { connect } from 'react-redux';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { actions } from '../../../../store/ducks/dataManagement.duck';
import { AddFieldModal } from '../components/addFieldModal';
import { Form } from '../components/form';
import FormOneFields from "../formFields/form-one.json";
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
      return <EntryForm handleChangeText={handleChangeText} onSubmit={onSubmit('form1')} value={value} />;
    case 1:
      value = formData['form2'];
      return <EntryForm2 handleChangeText={handleChangeText} onSubmit={onSubmit('form2')} value={value} />;
    case 2:
      value = formData['form3'];
      return <EntryForm3 handleChangeText={handleChangeText} onSubmit={onSubmit('form3')} value={value} />;
    case 3:
      value = formData['form4'];
      return <EntryForm4 handleChangeText={handleChangeText} onSubmit={onSubmit('form4')} value={value} />;
    case 4:
      value = formData['form5'];
      return <EntryForm5 handleChangeText={handleChangeText} onSubmit={onSubmit('form5')} value={value} />;
    default:
      return null;
  }
}

const MainForm = props => {
  const { dataManagement, currentDataManagementSteps, currentListing } = props;
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleChangeText = (event, name) => {
    const stepValues = currentDataManagementSteps[activeStep + 1] || {};
    const enteredvalue =
      event && event.target && event.target.name ? event.target.value : event;
    const data = {
      ...stepValues
    };
    data[activeStep + 1] = { ...stepValues, [name]: enteredvalue };
    dispatch(actions.setDataManagementSteps(data))
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleNext = () => {
    let obj = {};
    const fields = getFields();
    fields.forEach(f => {
      const { name } = f;
      const fieldName = name && name.trim().toLowerCase().replace(" ", "_");
      const data = currentDataManagementSteps[activeStep + 1];
      if (!!data[fieldName]) obj[fieldName] = data[fieldName];
    });
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    dispatch(actions.saveFormData(obj));
    dispatch(actions.getFormField(activeStep + 1));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = formName => values => {
    setFormData(prev => ({ ...prev, [formName]: values }));
    setActiveStep(prev => prev + 1);
  };

  const getFields = () => {
    let fields =
      dataManagement &&
      dataManagement[  + 1] &&
      dataManagement[activeStep + 1].fields;

    const formOneFields = Object.keys(FormOneFields);
    let updatedFields = formOneFields.map((fOne) => ({
      ...FormOneFields[fOne],
      data_type: FormOneFields[fOne].type,
      options_list: FormOneFields[fOne].options || null,
      name: fOne
    }));
    if (fields) {
      updatedFields = updatedFields.concat(fields);

    }
    return updatedFields;
  }

  useEffect(() => {
    dispatch(actions.getFormSteps());
    dispatch(actions.listingFormFields());
    dispatch(actions.getFormField(activeStep + 1));
  }, []);

  // useEffect(() => {
  // }, [activeStep]);

  const headersteps = dataManagement && Object.values(dataManagement);
  const fields = getFields();
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
              <Typography className={classes.instructions} component={'span'}>
                {/* {getStepContent(activeStep, onSubmit, formData, handleChangeText)} */}
              <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  {fields &&
                    fields.map(f => (
                      <Form
                        currentListing={currentListing}
                        formData={currentDataManagementSteps[activeStep + 1] || {}}
                        handleChangeText={handleChangeText}
                        field={f}
                      />
                    ))}
                </Grid>
              </form>
            </Typography>
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
      {/* <Grid item xs={12} sm={12}>
                <Button color="primary" onClick={() => setModalShow(true)}>Add Additional Fields</Button>
            </Grid> */}
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
  currentListing: store.dataManagement.currentListing,
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
