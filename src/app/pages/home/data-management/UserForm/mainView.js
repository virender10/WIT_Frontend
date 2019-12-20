import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EntryForm from './Form1';
import EntryForm2 from './Form2';
import EntryForm3 from './Form3';
import EntryForm4 from './Form4';
import EntryForm5 from './Form5';
import EntryForm7 from './Form7';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Well Static Attributes', 'Events(Dynamic Well Data)', 'Jobs', 'Production', 'Down Hole Equipment'];
}

function getStepContent(stepIndex, onSubmit, formData) {
    debugger
    let value = null;
    switch (stepIndex) {
        case 0:
            // return <EntryForm7/>
             value = formData['form1'];
             return <EntryForm onSubmit={onSubmit('form1')} value={value} />
        case 1:
            value = formData['form2'];
            return <EntryForm2 onSubmit={onSubmit('form2')} value={value} />
        case 2:
            value = formData['form3'];
            return <EntryForm3 onSubmit={onSubmit('form3')} value={value} />
        case 3:
            value = formData['form4'];
            return <EntryForm4 onSubmit={onSubmit('form4')} value={value} />
        case 4:
            value = formData['form5'];
            return <EntryForm5 onSubmit={onSubmit('form5')} value={value} />
        default:
            return null;
    }
}

const MainForm = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const steps = getSteps();
    const onSubmit = formName => values => {
        setFormData(prev => ({ ...prev, [formName]: values }));
        setActiveStep(prev => prev + 1);
    }
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        debugger
        console.log(formData);
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Submit</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions} component={'span'}>
                                {getStepContent(activeStep, onSubmit, formData)}
                            </Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                {/* <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button> */}
                            </div>
                            <br />
                        </div>
                    )}
            </div>
        </div>
    );
}

export default MainForm;