import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, FieldArray, Field } from "formik";
import { TextField } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import DatePickerEx from '../../../customs/CustomDatePicker';
import CustomCheckBox from '../../../customs/CustomCheckBox';
import ReactFileReader from 'react-file-reader';
import CloudDownloadTwoToneIcon from '@material-ui/icons/CloudDownloadTwoTone';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
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
        value.eve_attr = Object.keys(value.eve_attributes).map(title => ({ name: title, label: title.replace(/\s/g, ' ') }));//add space in label title
        return value;
    }
    return {
        eve_well_id: "",
        eve_id: "",
        eve_date: new Date(),
        eve_status: "",
        eve_shut: "",
        eve_flowing: "",
        eve_attributes: {},
        eve_attr: [],
        artificial_lift: []
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
    delete data.eve_attr;
    return data;
}

const EntryForm2 = ({ onSubmit, value }) => {
    const classes = useStyles();
    var csvFields = [];
    const [modalShow, setModalShow] = React.useState(false);
    const [error, setError] = React.useState(false);

    if (error) return null;

    const addField = mutator => title => {
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
                                // if (!values.eve_well_id) {
                                //     errors.eve_well_id = "Required Field"
                                // }
                                // if (!values.eve_id) {
                                //     errors.eve_id = "Required Field"
                                // }
                                // if (!values.eve_status) {
                                //     errors.eve_status = "Required Field"
                                // }
                                // if (!values.eve_shut) {
                                //     errors.eve_shut = "Required Field"
                                // }
                                // if (!values.eve_flowing) {
                                //     errors.eve_flowing = "Required Field"
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
                                isSubmitting
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
                                                            name="eve_well_id"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_well_id}
                                                            className={classes.textField}
                                                            helperText={touched.eve_well_id && errors.eve_well_id}
                                                            error={Boolean(touched.eve_well_id && errors.eve_well_id)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Event ID"
                                                            margin="normal"
                                                            name="eve_id"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_id}
                                                            className={classes.textField}
                                                            helperText={touched.eve_id && errors.eve_id}
                                                            error={Boolean(touched.eve_id && errors.eve_id)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <DatePickerEx label="Event Date" name="eve_date" value={values.eve_date} />
                                                        {/* <TextField
                                                            label="Event Date"
                                                            margin="normal"
                                                            name="eve_date"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_date}
                                                            className={classes.textField}
                                                            helperText={touched.eve_date && errors.eve_date}
                                                            error={Boolean(touched.eve_date && errors.eve_date)}
                                                        /> */}
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Status"
                                                            margin="normal"
                                                            name="eve_status"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_status}
                                                            className={classes.textField}
                                                            helperText={touched.eve_status && errors.eve_status}
                                                            error={Boolean(touched.eve_status && errors.eve_status)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Shut-In"
                                                            margin="normal"
                                                            name="eve_shut"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_shut}
                                                            className={classes.textField}
                                                            helperText={touched.eve_shut && errors.eve_shut}
                                                            error={Boolean(touched.eve_shut && errors.eve_shut)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Flowing"
                                                            margin="normal"
                                                            name="eve_flowing"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.eve_flowing}
                                                            className={classes.textField}
                                                            helperText={touched.eve_flowing && errors.eve_flowing}
                                                            error={Boolean(touched.eve_flowing && errors.eve_flowing)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}></Grid><Grid item xs={6} sm={3}></Grid>
                                                    <Grid item xs={12}>
                                                        <FormControl component="fieldset" className={classes.formControl}>
                                                            <FormLabel component="legend">On Artificial Lift</FormLabel>
                                                            <FormGroup aria-label="position" row>
                                                                <CustomCheckBox name="artificial_lift" value="rodpump" label="Rod Pump"/>
                                                                <CustomCheckBox name="artificial_lift" value="elec_sub" label="Electric Submersible Pump"/>
                                                                <CustomCheckBox name="artificial_lift" value="pcp" label="Progressive Cavity Pump"/>
                                                                <CustomCheckBox name="artificial_lift" value="gaslift" label="Gas Lift"/>
                                                                <CustomCheckBox name="artificial_lift" value="jet" label="Jet Pump"/>
                                                                <CustomCheckBox name="artificial_lift" value="plunger" label="Plunger Lift"/>
                                                                <CustomCheckBox name="artificial_lift" value="pagl" label="Plunger Assisted Gas"/>
                                                            </FormGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}></Grid>
                                                    <FieldArray
                                                        name="eve_attr"
                                                        render={renderArray => (
                                                            <>
                                                                {values.eve_attr && values.eve_attr.length > 0 ? (
                                                                    values.eve_attr.map((eve_attrib, index) => (
                                                                        <Grid key={eve_attrib.name} item xs={6} sm={3}>
                                                                                <TextField name={`eve_attributes.${eve_attrib.name}`} label={eve_attrib.label}
                                                                                    margin="normal"
                                                                                    onBlur={handleBlur}
                                                                                    onChange={handleChange}
                                                                                    value={values.eve_attributes[`${eve_attrib.name}`]}
                                                                                    className={classes.textField}
                                                                                    helperText={touched.state && errors.state}
                                                                                    error={Boolean(touched.state && errors.state)} />

                                                                                <AddCircleIcon color="primary" aria-label="add" style={{ cursor: 'pointer' }} onClick={() => { setModalShow(true) }}></AddCircleIcon>
                                                                                <RemoveCircleIcon color="secondary" aria-label="remove" style={{ cursor: 'pointer' }} onClick={() => renderArray.remove(eve_attrib)}></RemoveCircleIcon>
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
                                                                    onExit={addField(renderArray)}
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

export default EntryForm2;