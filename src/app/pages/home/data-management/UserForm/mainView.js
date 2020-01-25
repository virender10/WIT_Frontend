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
import EntryForm from './Form1';
import EntryForm2 from './Form2';
import EntryForm3 from './Form3';
import EntryForm4 from './Form4';
import EntryForm5 from './Form5';
import EntryForm7 from './Form7';
import { AddFieldModal } from '../components/addFieldModal';
import { Form } from '../components/form';

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

function getSteps() {
  return [
    'Well Static Attributes',
    'Events(Dynamic Well Data)',
    'Jobs',
    'Production',
    'Down Hole Equipment'
  ];
}

function getStepContent(stepIndex, onSubmit, formData) {
  // debugger
  let value = null;
  switch (stepIndex) {
    case 0:
      // return <EntryForm7/>
      value = formData['form1'];
      return <EntryForm onSubmit={onSubmit('form1')} value={value} />;
    case 1:
      value = formData['form2'];
      return <EntryForm2 onSubmit={onSubmit('form2')} value={value} />;
    case 2:
      value = formData['form3'];
      return <EntryForm3 onSubmit={onSubmit('form3')} value={value} />;
    case 3:
      value = formData['form4'];
      return <EntryForm4 onSubmit={onSubmit('form4')} value={value} />;
    case 4:
      value = formData['form5'];
      return <EntryForm5 onSubmit={onSubmit('form5')} value={value} />;
    default:
      return null;
  }
}

const MainForm = props => {
  const { dataManagement } = props;
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const onSubmit = formName => values => {
    setFormData(prev => ({ ...prev, [formName]: values }));
    setActiveStep(prev => prev + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    dispatch(actions.getFormSteps());
  }, []);

  useEffect(() => {
    dispatch(actions.getFormField(activeStep + 1));
  }, [activeStep]);

  const headersteps = dataManagement && Object.values(dataManagement);
  const fields =
    dataManagement &&
    dataManagement[activeStep + 1] &&
    dataManagement[activeStep + 1].fields;
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
              <form className={classes.container} noValidate autoComplete="off">
                <Grid container spacing={3}>
                  {fields && fields.map(f => <Form field={f} />)}
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
  dataManagement: store.dataManagement.steps
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
