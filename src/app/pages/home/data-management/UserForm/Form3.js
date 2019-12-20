import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, FieldArray } from "formik";
import { TextField} from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Radio from '@material-ui/core/Radio';
import CustomCheckBox from '../../../customs/CustomCheckBox';
import DatePickerEx from '../../../customs/CustomDatePicker';
import ReactFileReader from 'react-file-reader';
import CloudDownloadTwoToneIcon from '@material-ui/icons/CloudDownloadTwoTone';
import IconButton from '@material-ui/core/IconButton';

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
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        marginTop: '0px',
        marginBottom: '0px',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const getInitialValue = (value) => {
    if (value) {
        value.job_attr = Object.keys(value.job_attributes).map(title => ({ name: title, label: title.replace(/\s/g, ' ') }));//add space in label title
        return value;
    }
    return {
        job_well_id: "",
        job_id: "",
        job_shut_date: new Date(),
        job_startdate: new Date(),
        job_enddate: new Date(),
        job_failcomp: "",
        job_failmech: "",
        job_summary: "",
        job_timelog: "",
        job_BHA: "",job_BHA_check:[], job_AFE: "", job_FE: "", job_actual_cost: "",
        job_attributes: {},
        job_attr: [],
    };
};

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
                <Modal.Title id="contained-modal-title-vcenter">Please name your field.....</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className={classes.container} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="dynamicField"
                            label="Field"
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

const cleanInput = values => {
    const data = values;
    delete data.job_attr;
    return data;
}

const EntryForm3 = ({value, onSubmit}) => {
    const classes = useStyles();
    var csvFields = [];
    const [modalShow, setModalShow] = React.useState(false);
    const [error, setError] = React.useState(false);

    const addJob = mutator => title => {
        mutator.push({ name: title.replace(/\s/g, '_'), label: title })//remove space from title name
    };

    const handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            csvFields.push(reader.result);
            csvFields = csvFields[0].split("\n").slice(1, -1);
            alert(csvFields)
        }
        reader.readAsText(files[0]);
    }

    return (
        <>
            <div className="kt-portlet--height-fluid">
            <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                    </div>
                    <div className="kt-portlet__head-toolbar">
                    <IconButton color="secondary" aria-label="import csv">
                            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                                <CloudDownloadTwoToneIcon style={{ fontSize: 37 }}/>
                            </ReactFileReader>
                        </IconButton>
                    </div>
                </div>
                <div className="kt-portlet__body">
                    <div className="kt-widget4">
                        <Formik
                            initialValues={getInitialValue(value)}
                            validate={values => {
                                const errors = {};
                                
                                // if(!values.job_well_id){
                                //     errors.job_well_id="Required Field"
                                // }
                                // if(!values.job_id){
                                //     errors.job_id="Required Field"
                                // }
                                // if(!values.job_failcomp){
                                //     errors.job_failcomp="Required Field"
                                // }
                                // if(!values.job_failmech){
                                //     errors.job_failmech="Required Field"
                                // }
                                // if(!values.job_summary){
                                //     errors.job_summary="Required Field"
                                // }
                                // if(!values.job_timelog){
                                //     errors.job_timelog="Required Field"
                                // }
                                // if(!values.job_AFE){
                                //     errors.job_AFE="Required Field"
                                // }
                                // if(!values.job_FE){
                                //     errors.job_FE="Required Field"
                                // }
                                // if(!values.job_actual_cost){
                                //     errors.job_actual_cost="Required Field"
                                // }
                                return errors;
                            }}
                            onSubmit={values => {
                                onSubmit(cleanInput(values));
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
                                    <>
                                        <form
                                            noValidate={true}
                                            autoComplete="off"
                                            className="kt-form"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className={classes.root}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Unique Well ID"
                                                            margin="normal"
                                                            name="job_well_id"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_well_id}
                                                            className={classes.textField}
                                                            helperText={touched.job_well_id && errors.job_well_id}
                                                            error={Boolean(touched.job_well_id && errors.job_well_id)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Unique Job ID"
                                                            margin="normal"
                                                            name="job_id"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_id}
                                                            className={classes.textField}
                                                            helperText={touched.job_id && errors.job_id}
                                                            error={Boolean(touched.job_id && errors.job_id)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <DatePickerEx label="Well Shut-In Date" name ="job_shut_date" value={values.job_shut_date} ></DatePickerEx>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                    <DatePickerEx label="Job Start Date" name="job_startdate" value={values.job_startdate}></DatePickerEx>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                    <DatePickerEx label="Job End Date" name="job_enddate" value = {values.job_enddate}></DatePickerEx>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Failure Component"
                                                            margin="normal"
                                                            name="job_failcomp"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_failcomp}
                                                            className={classes.textField}
                                                            helperText={touched.job_failcomp && errors.job_failcomp}
                                                            error={Boolean(touched.job_failcomp && errors.job_failcomp)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Failure Mechanism"
                                                            margin="normal"
                                                            name="job_failmech"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_failmech}
                                                            className={classes.textField}
                                                            helperText={touched.job_failmech && errors.job_failmech}
                                                            error={Boolean(touched.job_failmech && errors.job_failmech)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Job Summary"
                                                            margin="normal"
                                                            name="job_summary"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_summary}
                                                            className={classes.textField}
                                                            helperText={touched.job_summary && errors.job_summary}
                                                            error={Boolean(touched.job_summary && errors.job_summary)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Job Time Log"
                                                            margin="normal"
                                                            name="job_timelog"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_timelog}
                                                            className={classes.textField}
                                                            helperText={touched.job_timelog && errors.job_timelog}
                                                            error={Boolean(touched.job_timelog && errors.job_timelog)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="AFE Estimate by accounting code"
                                                            margin="normal"
                                                            name="job_AFE"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_AFE}
                                                            className={classes.textField}
                                                            helperText={touched.job_AFE && errors.job_AFE}
                                                            error={Boolean(touched.job_AFE && errors.job_AFE)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Field Estimate by accounting code"
                                                            margin="normal"
                                                            name="job_FE"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_FE}
                                                            className={classes.textField}
                                                            helperText={touched.job_FE && errors.job_FE}
                                                            error={Boolean(touched.job_FE && errors.job_FE)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Actual Cost by accounting code"
                                                            margin="normal"
                                                            name="job_actual_cost"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.job_actual_cost}
                                                            className={classes.textField}
                                                            helperText={touched.job_actual_cost && errors.job_actual_cost}
                                                            error={Boolean(touched.job_actual_cost && errors.job_actual_cost)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <label><Radio
                                                                checked={values.job_BHA === 'BHAin'}
                                                                onChange={() => setFieldValue("job_BHA", "BHAin")}
                                                                value="BHAin"
                                                                name="job_BHA"
                                                                inputProps={{ 'aria-label': 'Bottom Hole Assembly In' }}
                                                                label="Bottom Hole Assembly (BHA) in"
                                                            />Bottom Hole Assembly (BHA) in</label>
                                                            <label><Radio
                                                                checked={values.job_BHA === 'BHAout'}
                                                                onChange={() => setFieldValue("job_BHA", "BHAout")}
                                                                value="BHAout"
                                                                name="job_BHA"
                                                                inputProps={{ 'aria-label': 'Bottom Hole Assembly Out' }}
                                                                label="Bottom Hole Assembly (BHA) out"
                                                            />Bottom Hole Assembly (BHA) out</label>
                                                            
                                                            {values.job_BHA ==='BHAout' ? <CustomCheckBox name="job_BHA_check" value="preBHA" label="should be previous BHA in"/> : null}
                                                    </Grid>
                                                    <FieldArray
                                                        name="job_attr"
                                                        render={dynamicJobArray => (
                                                            <>
                                                                {values.job_attr && values.job_attr.length > 0 ? (
                                                                    values.job_attr.map((job_attrib, index) => (
                                                                        <Grid key={job_attrib.name} item xs={6} sm={3}>
                                                                                <TextField name={`job_attributes.${job_attrib.name}`} label={job_attrib.label}
                                                                                    margin="normal"
                                                                                    onBlur={handleBlur}
                                                                                    onChange={handleChange}
                                                                                    value={values.job_attributes[`${job_attrib.name}`]}
                                                                                    className={classes.textField}
                                                                                    helperText={touched.state && errors.state}
                                                                                    error={Boolean(touched.state && errors.state)} />

                                                                                <AddCircleIcon color="primary" aria-label="add" style={{ cursor: 'pointer' }} onClick={() => { setModalShow(true) }}></AddCircleIcon>
                                                                                <RemoveCircleIcon color="secondary" aria-label="remove" style={{ cursor: 'pointer' }} onClick={() => dynamicJobArray.remove(job_attrib)}></RemoveCircleIcon>
                                                                        </Grid>
                                                                    ))
                                                                ) : (
                                                                        <Grid item xs={6} sm={3}>
                                                                            <Button color="primary" onClick={() => setModalShow(true)}>Add Additional Fields</Button>
                                                                        </Grid>
                                                                    )}
                                                                <MyVerticallyCenteredModal
                                                                    show={modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                    onExit={addJob(dynamicJobArray)}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </Grid>
                                            </div>
                                            <br />
                                            <div className="kt-login__actions">
                                                <Grid item xs={6} sm={3}>
                                                    <Button type="submit"
                                                        disabled={isSubmitting} color="primary" variant="contained">Go</Button>
                                                </Grid>
                                            </div>
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>

                    </div>

                </div>
            </div>
        </>
    );
}

export default EntryForm3;