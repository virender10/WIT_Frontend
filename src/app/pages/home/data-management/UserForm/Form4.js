import React from 'react';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { Formik, FieldArray } from "formik";
import { TextField, Select } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DatePickerEx from '../../../customs/CustomDatePicker';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
        value.prod_attr = Object.keys(value.prod_attributes).map(title => ({ name: title, label: title.replace(/\s/g, ' ') }));//add space in label title
        return value;
    }
    return {
        prod_d_uniqueid: "", prod_d_date: new Date(), prod_d_gas: "", prod_d_oil: "", prod_d_water: "", prod_d_cp: "", prod_d_tp: "", prod_d_choke: "", prod_hours: "",
        prod_m_uniqueid: "", prod_m_date: new Date(), prod_m_gas: "", prod_m_oil: "", prod_m_water: "", prod_m_cp: "", prod_m_tp: "", prod_m_choke: "", prod_days: "",
        prod_attributes: {},
        prod_attr: [],
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
    delete data.prod_attr;
    return data;
}

const EntryForm4 = ({ value, onSubmit }) => {
    const classes = useStyles();
    var csvFields = [];
    const [modalShow, setModalShow] = React.useState(false);
    const [error, setError] = React.useState(false);
    if (error) return null;

    const addProd = mutator => title => {
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
                                // if(!values.prod_d_uniqueid) {
                                //     errors.prod_d_uniqueid="Required Field"
                                // }
                                // if(!values.prod_d_gas) {
                                //     errors.prod_d_gas="Required Field"
                                // }
                                // if(!values.prod_d_oil) {
                                //     errors.prod_d_oil="Required Field"
                                // }
                                // if(!values.prod_d_water) {
                                //     errors.prod_d_water="Required Field"
                                // }
                                // if(!values.prod_d_cp) {
                                //     errors.prod_d_cp="Required Field"
                                // }
                                // if(!values.prod_d_tp) {
                                //     errors.prod_d_tp="Required Field"
                                // }
                                // if(!values.prod_d_choke) {
                                //     errors.prod_d_choke="Required Field"
                                // }
                                // if(!values.prod_hours) {
                                //     errors.prod_hours="Required Fields"
                                // }
                                // if(!values.prod_m_uniqueid) {
                                //     errors.prod_m_uniqueid="Required Field"
                                // }
                                // if(!values.prod_m_gas) {
                                //     errors.prod_m_gas="Required Field"
                                // }
                                // if(!values.prod_m_oil) {
                                //     errors.prod_m_oil="Required Field"
                                // }
                                // if(!values.prod_m_water) {
                                //     errors.prod_m_water="Required Field"
                                // }
                                // if(!values.prod_m_cp) {
                                //     errors.prod_m_cp="Required Field"
                                // }
                                // if(!values.prod_m_tp) {
                                //     errors.prod_m_tp="Required Field"
                                // }
                                // if(!values.prod_m_choke) {
                                //     errors.prod_m_choke="Required Field"
                                // }
                                // if(!values.prod_days) {
                                //     errors.prod_days="Required Field"
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
                                                            className={classes.textField}
                                                            name="prod_d_uniqueid"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_uniqueid}
                                                            margin="normal"
                                                            helperText={touched.prod_d_uniqueid && errors.prod_d_uniqueid}
                                                            error={Boolean(touched.prod_d_uniqueid && errors.prod_d_uniqueid)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <DatePickerEx label="Date" name="date" value={values.prod_d_date} />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Gas"
                                                            margin="normal"
                                                            name="prod_d_gas"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_gas}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_gas && errors.prod_d_gas}
                                                            error={Boolean(touched.prod_d_gas && errors.prod_d_gas)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Oil"
                                                            margin="normal"
                                                            name="prod_d_oil"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_oil}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_oil && errors.prod_d_oil}
                                                            error={Boolean(touched.prod_d_oil && errors.prod_d_oil)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Water"
                                                            margin="normal"
                                                            name="prod_d_water"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_water}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_water && errors.prod_d_water}
                                                            error={Boolean(touched.prod_d_water && errors.prod_d_water)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Casing Pressure (psi)"
                                                            margin="normal"
                                                            name="prod_d_cp"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.email}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_cp && errors.prod_d_cp}
                                                            error={Boolean(touched.prod_d_cp && errors.prod_d_cp)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Tubing Pressure (psi)"
                                                            margin="normal"
                                                            name="prod_d_tp"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_tp}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_tp && errors.prod_d_tp}
                                                            error={Boolean(touched.prod_d_tp && errors.prod_d_tp)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Choke (fraction)"
                                                            margin="normal"
                                                            name="prod_d_choke"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_d_choke}
                                                            className={classes.textField}
                                                            helperText={touched.prod_d_choke && errors.prod_d_choke}
                                                            error={Boolean(touched.prod_d_choke && errors.prod_d_choke)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Hours On"
                                                            margin="normal"
                                                            name="prod_hours"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_hours}
                                                            className={classes.textField}
                                                            helperText={touched.prod_hours && errors.prod_hours}
                                                            error={Boolean(touched.prod_hours && errors.prod_hours)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={9}></Grid>

                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Unique Well ID"
                                                            className={classes.textField}
                                                            name="prod_m_uniqueid"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_uniqueid}
                                                            margin="normal"
                                                            helperText={touched.prod_m_uniqueid && errors.prod_m_uniqueid}
                                                            error={Boolean(touched.prod_m_uniqueid && errors.prod_m_uniqueid)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <DatePickerEx label="Date" name="date" value={values.prod_m_date} />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Gas"
                                                            margin="normal"
                                                            name="prod_m_gas"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_gas}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_gas && errors.prod_m_gas}
                                                            error={Boolean(touched.prod_m_gas && errors.prod_m_gas)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Oil"
                                                            margin="normal"
                                                            name="prod_m_oil"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_oil}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_oil && errors.prod_m_oil}
                                                            error={Boolean(touched.prod_m_oil && errors.prod_m_oil)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Water"
                                                            margin="normal"
                                                            name="prod_m_water"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_water}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_water && errors.prod_m_water}
                                                            error={Boolean(touched.prod_m_water && errors.prod_m_water)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Casing Pressure (psi)"
                                                            margin="normal"
                                                            name="prod_m_cp"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.email}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_cp && errors.prod_m_cp}
                                                            error={Boolean(touched.prod_m_cp && errors.prod_m_cp)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Tubing Pressure (psi)"
                                                            margin="normal"
                                                            name="prod_m_tp"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_tp}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_tp && errors.prod_m_tp}
                                                            error={Boolean(touched.prod_m_tp && errors.prod_m_tp)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Choke (fraction)"
                                                            margin="normal"
                                                            name="prod_m_choke"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_m_choke}
                                                            className={classes.textField}
                                                            helperText={touched.prod_m_choke && errors.prod_m_choke}
                                                            error={Boolean(touched.prod_m_choke && errors.prod_m_choke)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={3}>
                                                        <TextField
                                                            label="Days On"
                                                            margin="normal"
                                                            name="prod_mays"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.prod_mays}
                                                            className={classes.textField}
                                                            helperText={touched.prod_mays && errors.prod_mays}
                                                            error={Boolean(touched.prod_mays && errors.prod_mays)}
                                                        />
                                                    </Grid>
                                                    <FieldArray
                                                        name="prod_attr"
                                                        render={dynamicProd => (
                                                            <>
                                                                {values.prod_attr && values.prod_attr.length > 0 ? (
                                                                    values.prod_attr.map((prod_attrib, index) => (
                                                                        <Grid key={prod_attrib.name} item xs={6} sm={3}>
                                                                                <TextField name={`prod_attributes.${prod_attrib.name}`} label={prod_attrib.label}
                                                                                    margin="normal"
                                                                                    onBlur={handleBlur}
                                                                                    onChange={handleChange}
                                                                                    value={values.prod_attributes[`${prod_attrib.name}`]}
                                                                                    className={classes.textField}
                                                                                    helperText={touched.state && errors.state}
                                                                                    error={Boolean(touched.state && errors.state)} />

                                                                                <AddCircleIcon color="primary" aria-label="add" style={{ cursor: 'pointer' }} onClick={() => { setModalShow(true) }}></AddCircleIcon>
                                                                                <RemoveCircleIcon color="secondary" aria-label="remove" style={{ cursor: 'pointer' }} onClick={() => dynamicProd.remove(index)}></RemoveCircleIcon>
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
                                                                    onExit={addProd(dynamicProd)}
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

export default EntryForm4;