import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, FieldArray } from "formik";
import { TextField } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Radio from '@material-ui/core/Radio';
import CustomCheckBox from '../../../customs/CustomCheckBox';
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
        value.DHE_attr = Object.keys(value.DHE_attributes).map(title => ({ name: title, label: title.replace(/\s/g, ' ') }));//add space in label title
        return value;
    }
    return {
        DHE_c_comp: "", DHE_c_count: "", DHE_c_cl: "", DHE_c_tl: "", DHE_c_grade: "", DHE_c_dt: "", DHE_c_db: "", DHE_c_od: "", DHE_c_id: "", DHE_c_dd: "", DHE_c_weight: "",
        DHE_t_comp: "", DHE_t_count: "", DHE_t_cl: "", DHE_t_tl: "", DHE_t_grade: "", DHE_t_dt: "", DHE_t_db: "", DHE_t_od: "", DHE_t_id: "", DHE_t_dd: "", DHE_t_weight: "",
        DHE_r_uniqueId: "", DHE_r_jobId: "", DHE_r_comp: "", DHE_r_count: "", DHE_r_cl: "", DHE_r_tl: "", DHE_r_make: "", DHE_r_grade: "", DHE_r_rodia: "", DHE_r_weight: "", DHE_r_ct: "", DHE_r_cd: "",
        DHE_attributes: {},
        DHE_attr: [],

        DHE_pumps: "", DHE_jetCheck: [], DHE_rodInsert: [], DHE_gasListCheck: [], DHE_ESP: [],
        DHE_BHA: "", DHE_ss: [], DHE_gs: [], DHE_ds: []
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
    delete data.DHE_attr;
    console.log(data);
    return data;
}

const EntryForm5 = ({ value, onSubmit }) => {
    const classes = useStyles();
    var csvFields = [];
    const [modalShow, setModalShow] = React.useState(false);
    const [error, setError] = React.useState(false);

    const addDHE = mutator => title => {
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
                            enableReinitialize
                            validate={values => {
                                 const errors = {};
                                // if (!values.DHE_c_comp) {
                                //     errors.DHE_c_comp = "Required Field"
                                // }
                                // if (!values.DHE_c_count) {
                                //     errors.DHE_c_count = "Required Field"
                                // }
                                // if (!values.DHE_c_cl) {
                                //     errors.DHE_c_cl = "Required Field"
                                // }
                                // if (!values.DHE_c_tl) {
                                //     errors.DHE_c_tl = "Required Field"
                                // }
                                // if (!values.DHE_c_grade) {
                                //     errors.DHE_c_grade = "Required Field"
                                // }
                                // if (!values.DHE_c_dt) {
                                //     errors.DHE_c_dt = "Required Field"
                                // }
                                // if (!values.DHE_c_db) {
                                //     errors.DHE_c_db = "Required Field"
                                // }
                                // if (!values.DHE_c_od) {
                                //     errors.DHE_c_od = "Required Field"
                                // }
                                // if (!values.DHE_c_id) {
                                //     errors.DHE_c_id = "Required Field"
                                // }
                                // if (!values.DHE_c_dd) {
                                //     errors.DHE_c_dd = "Required Field"
                                // }
                                // if (!values.DHE_c_weight) {
                                //     errors.DHE_c_weight = "Required Field"
                                // }
                                // if (!values.DHE_t_comp) {
                                //     errors.DHE_t_comp = "Required Field"
                                // } 
                                // if (!values.DHE_t_count) {
                                //     errors.DHE_t_count = "Required Field"
                                // }
                                // if (!values.DHE_t_cl) {
                                //     errors.DHE_t_cl = "Required Field"
                                // }
                                // if (!values.DHE_t_tl) {
                                //     errors.DHE_t_tl = "Required Field"
                                // }
                                // if (!values.DHE_t_grade) {
                                //     errors.DHE_t_grade = "Required Field"
                                // }
                                // if (!values.DHE_t_dt) {
                                //     errors.DHE_t_dt = "Required Field"
                                // }
                                // if (!values.DHE_t_db) {
                                //     errors.DHE_t_db = "Required Field"
                                // }
                                // if (!values.DHE_t_od) {
                                //     errors.DHE_t_od = "Required Field"
                                // }
                                // if (!values.DHE_t_id) {
                                //     errors.DHE_t_id = "Required Field"
                                // }
                                // if (!values.DHE_t_dd) {
                                //     errors.DHE_t_dd = "Required Field"
                                // }
                                // if (!values.DHE_t_weight) {
                                //     errors.DHE_t_weight = "Required Field"
                                // }
                                // if (!values.DHE_r_uniqueId) {
                                //     errors.DHE_r_uniqueId = "Required Field"
                                // }
                                // if (!values.DHE_r_jobId) {
                                //     errors.DHE_r_jobId = "Required Field"
                                // }
                                // if (!values.DHE_r_comp) {
                                //     errors.DHE_r_comp = "Required Field"
                                // }
                                // if (!values.DHE_r_count) {
                                //     errors.DHE_r_count = "Required Field"
                                // }
                                // if (!values.DHE_r_cl) {
                                //     errors.DHE_r_cl = "Required Field"
                                // }
                                // if (!values.DHE_r_tl) {
                                //     errors.DHE_r_tl = "Required Field"
                                // }
                                // if (!values.DHE_r_make) {
                                //     errors.DHE_r_make = "Required Field"
                                // }
                                // if (!values.DHE_r_grade) {
                                //     errors.DHE_r_grade = "Required Field"
                                // }
                                // if (!values.DHE_r_rodia) {
                                //     errors.DHE_r_rodia = "Required Field"
                                // }
                                // if (!values.DHE_r_weight) {
                                //     errors.DHE_r_weight = "Required Field"
                                // }
                                // if (!values.DHE_r_ct) {
                                //     errors.DHE_r_ct = "Required Field"
                                // }
                                // if (!values.DHE_r_cd) {
                                //     errors.DHE_r_cd = "Required Field"
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
                                                <Grid item xs={12}><h5>Casing#</h5>Tie to spud date until drilling and completions is added</Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component"
                                                        className={classes.textField}
                                                        name="DHE_c_comp"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_comp}
                                                        margin="normal"
                                                        helperText={touched.DHE_c_comp && errors.DHE_c_comp}
                                                        error={Boolean(touched.DHE_c_comp && errors.DHE_c_comp)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Count"
                                                        margin="normal"
                                                        name="DHE_c_count"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_count}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_count && errors.DHE_c_count}
                                                        error={Boolean(touched.DHE_c_count && errors.DHE_c_count)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component Length (ft)"
                                                        margin="normal"
                                                        name="DHE_c_cl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_cl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_cl && errors.DHE_c_cl}
                                                        error={Boolean(touched.DHE_c_cl && errors.DHE_c_cl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Total Length (ft)"
                                                        margin="normal"
                                                        name="DHE_c_tl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_tl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_tl && errors.DHE_c_tl}
                                                        error={Boolean(touched.DHE_c_tl && errors.DHE_c_tl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Grade"
                                                        margin="normal"
                                                        name="DHE_c_grade"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_grade}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_grade && errors.DHE_c_grade}
                                                        error={Boolean(touched.DHE_c_grade && errors.DHE_c_grade)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Depth of Top (ft)"
                                                        margin="normal"
                                                        name="DHE_c_dt"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_dt}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_dt && errors.DHE_c_dt}
                                                        error={Boolean(touched.DHE_c_dt && errors.DHE_c_dt)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Depth of Bottom (ft)"
                                                        margin="normal"
                                                        name="DHE_c_db"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_db}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_db && errors.DHE_c_db}
                                                        error={Boolean(touched.DHE_c_db && errors.DHE_c_db)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Outer Diameter (in)"
                                                        margin="normal"
                                                        name="DHE_c_od"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_od}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_od && errors.DHE_c_od}
                                                        error={Boolean(touched.DHE_c_od && errors.DHE_c_od)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Inner Diameter (in)"
                                                        className={classes.textField}
                                                        name="DHE_c_id"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_id}
                                                        margin="normal"
                                                        helperText={touched.DHE_c_id && errors.DHE_c_id}
                                                        error={Boolean(touched.DHE_c_id && errors.DHE_c_id)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Drift Diameter (in)"
                                                        margin="normal"
                                                        name="DHE_c_dd"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_dd}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_dd && errors.DHE_c_dd}
                                                        error={Boolean(touched.DHE_c_dd && errors.DHE_c_dd)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Weight"
                                                        margin="normal"
                                                        name="DHE_c_weight"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_c_weight}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_c_weight && errors.DHE_c_weight}
                                                        error={Boolean(touched.DHE_c_weight && errors.DHE_c_weight)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}><h5>Tubing #</h5></Grid>

                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component"
                                                        className={classes.textField}
                                                        name="DHE_t_comp"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_comp}
                                                        margin="normal"
                                                        helperText={touched.DHE_t_comp && errors.DHE_t_comp}
                                                        error={Boolean(touched.DHE_t_comp && errors.DHE_t_comp)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Count"
                                                        margin="normal"
                                                        name="DHE_t_count"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_count}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_count && errors.DHE_t_count}
                                                        error={Boolean(touched.DHE_t_count && errors.DHE_t_count)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component Length (ft)"
                                                        margin="normal"
                                                        name="DHE_t_cl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_cl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_cl && errors.DHE_t_cl}
                                                        error={Boolean(touched.DHE_t_cl && errors.DHE_t_cl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Total Length (ft)"
                                                        margin="normal"
                                                        name="DHE_t_tl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_tl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_tl && errors.DHE_t_tl}
                                                        error={Boolean(touched.DHE_t_tl && errors.DHE_t_tl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Grade"
                                                        margin="normal"
                                                        name="DHE_t_grade"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_grade}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_grade && errors.DHE_t_grade}
                                                        error={Boolean(touched.DHE_t_grade && errors.DHE_t_grade)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Depth of Top (ft)"
                                                        margin="normal"
                                                        name="DHE_t_dt"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_dt}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_dt && errors.DHE_t_dt}
                                                        error={Boolean(touched.DHE_t_dt && errors.DHE_t_dt)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Depth of Bottom (ft)"
                                                        margin="normal"
                                                        name="DHE_t_db"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_db}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_db && errors.DHE_t_db}
                                                        error={Boolean(touched.DHE_t_db && errors.DHE_t_db)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Outer Diameter (in)"
                                                        margin="normal"
                                                        name="DHE_t_od"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_od}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_od && errors.DHE_t_od}
                                                        error={Boolean(touched.DHE_t_od && errors.DHE_t_od)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Inner Diameter (in)"
                                                        className={classes.textField}
                                                        name="DHE_t_id"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_id}
                                                        margin="normal"
                                                        helperText={touched.DHE_t_id && errors.DHE_t_id}
                                                        error={Boolean(touched.DHE_t_id && errors.DHE_t_id)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Drift Diameter (in)"
                                                        margin="normal"
                                                        name="DHE_t_dd"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_dd}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_dd && errors.DHE_t_dd}
                                                        error={Boolean(touched.DHE_t_dd && errors.DHE_t_dd)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Weight"
                                                        margin="normal"
                                                        name="DHE_t_weight"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_t_weight}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_t_weight && errors.DHE_t_weight}
                                                        error={Boolean(touched.DHE_t_weight && errors.DHE_t_weight)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}><h5>Rods #</h5>Used only for progressive cavity pumps (PCP) and insert pumps/positive displacement pumps</Grid>

                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Unique Well ID"
                                                        margin="normal"
                                                        name="DHE_r_uniqueId"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_uniqueId}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_uniqueId && errors.DHE_r_uniqueId}
                                                        error={Boolean(touched.DHE_r_uniqueId && errors.DHE_r_uniqueId)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Job ID or Event ID"
                                                        margin="normal"
                                                        name="DHE_r_jobId"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_jobId}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_jobId && errors.DHE_r_jobId}
                                                        error={Boolean(touched.DHE_r_jobId && errors.DHE_r_jobId)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component"
                                                        margin="normal"
                                                        name="DHE_r_comp"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_comp}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_comp && errors.DHE_r_comp}
                                                        error={Boolean(touched.DHE_r_comp && errors.DHE_r_comp)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Count"
                                                        margin="normal"
                                                        name="DHE_r_count"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_count}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_count && errors.DHE_r_count}
                                                        error={Boolean(touched.DHE_r_count && errors.DHE_r_count)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Component Length"
                                                        margin="normal"
                                                        name="DHE_r_cl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_cl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_cl && errors.DHE_r_cl}
                                                        error={Boolean(touched.DHE_r_cl && errors.DHE_r_cl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Total Length"
                                                        margin="normal"
                                                        name="DHE_r_tl"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_tl}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_tl && errors.DHE_r_tl}
                                                        error={Boolean(touched.DHE_r_tl && errors.DHE_r_tl)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Make"
                                                        margin="normal"
                                                        name="DHE_r_make"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_make}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_make && errors.DHE_r_make}
                                                        error={Boolean(touched.DHE_r_make && errors.DHE_r_make)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Grade"
                                                        margin="normal"
                                                        name="DHE_r_grade"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_grade}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_grade && errors.DHE_r_grade}
                                                        error={Boolean(touched.DHE_r_grade && errors.DHE_r_grade)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Rod Diameter"
                                                        margin="normal"
                                                        name="DHE_r_rodia"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_rodia}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_rodia && errors.DHE_r_rodia}
                                                        error={Boolean(touched.DHE_r_rodia && errors.DHE_r_rodia)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Weight"
                                                        margin="normal"
                                                        name="DHE_r_weight"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_weight}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_weight && errors.DHE_r_weight}
                                                        error={Boolean(touched.DHE_r_weight && errors.DHE_r_weight)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Coupling Type"
                                                        margin="normal"
                                                        name="DHE_r_ct"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_ct}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_ct && errors.DHE_r_ct}
                                                        error={Boolean(touched.DHE_r_ct && errors.DHE_r_ct)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <TextField
                                                        label="Coupling Diameter"
                                                        margin="normal"
                                                        name="DHE_r_cd"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DHE_r_cd}
                                                        className={classes.textField}
                                                        helperText={touched.DHE_r_cd && errors.DHE_r_cd}
                                                        error={Boolean(touched.DHE_r_cd && errors.DHE_r_cd)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}><h5>Pumps #</h5>Tied to an artificial lift method</Grid>
                                                <label><Radio
                                                    checked={values.DHE_pumps === 'pump_radio1'}
                                                    onChange={() => setFieldValue("DHE_pumps", "pump_radio1")}
                                                    value="pump_radio1"
                                                    name="DHE_pumps"
                                                    inputProps={{ 'aria-label': 'Jet Pump' }}
                                                    label="Jet Pump"
                                                />Jet Pump</label>
                                                <label><Radio
                                                    checked={values.DHE_pumps === 'pump_radio2'}
                                                    onChange={() => setFieldValue("DHE_pumps", "pump_radio2")}
                                                    value="pump_radio2"
                                                    name="DHE_pumps"
                                                    inputProps={{ 'aria-label': 'Rod Insert Pump' }}
                                                    label="Rod Insert Pump"
                                                />Rod Insert Pump</label>
                                                <label><Radio
                                                    checked={values.DHE_pumps === 'pump_radio3'}
                                                    onChange={() => setFieldValue("DHE_pumps", "pump_radio3")}
                                                    value="pump_radio3"
                                                    name="DHE_pumps"
                                                    inputProps={{ 'aria-label': 'Gas Lift' }}
                                                    label="Gas Lift"
                                                />Gas Lift</label>
                                                <label><Radio
                                                    checked={values.DHE_pumps === 'pump_radio4'}
                                                    onChange={() => setFieldValue("DHE_pumps", "pump_radio4")}
                                                    value="pump_radio4"
                                                    name="DHE_pumps"
                                                    inputProps={{ 'aria-label': 'Electric Submersible Pump' }}
                                                    label="Electric Submersible Pump"
                                                />Electric Submersible Pump (ESP)</label>

                                                {values.DHE_pumps === 'pump_radio1' ? <CustomCheckBox name="DHE_jetCheck" value="specs_list" label="Jet Pump specs list" />
                                                    : values.DHE_pumps === 'pump_radio2' ? <CustomCheckBox name="DHE_rodInsert" value="rod_insert" label="Rod Insert Pump specs list" /> :
                                                        values.DHE_pumps === 'pump_radio3' ? <div>
                                                            <CustomCheckBox name="DHE_gasListCheck" value="mandrel_count" label="Mandrel Count" />
                                                            <CustomCheckBox name="DHE_gasListCheck" value="mandrel_size" label="Mandrel Size" />
                                                            <CustomCheckBox name="DHE_gasListCheck" value="mandrel_ap" label="Mandrel actuating pressure" />
                                                            <CustomCheckBox name="DHE_gasListCheck" value="mandrel_depths" label="Mandrel depths" />
                                                        </div> :
                                                            values.DHE_pumps === 'pump_radio4' ? <div>
                                                                <CustomCheckBox name="DHE_ESP" value="esp_manufacturer" label="Manufacturer" />
                                                                <CustomCheckBox name="DHE_ESP" value="esp_model" label="Model" />
                                                                <CustomCheckBox name="DHE_ESP" value="esp_count" label="Stage Count" />
                                                                <CustomCheckBox name="DHE_ESP" value="esp_other" label="Other Specs" />
                                                            </div> : null}


                                                <Grid item xs={12}><h5>Bottom Hole Assembly #</h5></Grid>

                                                <label><Radio
                                                    checked={values.DHE_BHA === 'BHA_radio1'}
                                                    onChange={() => setFieldValue("DHE_BHA", "BHA_radio1")}
                                                    value="BHA_radio1"
                                                    name="DHE_BHA"
                                                    inputProps={{ 'aria-label': 'Sand Screen' }}
                                                    label="Sand Screen"
                                                />Sand Screen</label>
                                                <label><Radio
                                                    checked={values.DHE_BHA === 'BHA_radio2'}
                                                    onChange={() => setFieldValue("DHE_BHA", "BHA_radio2")}
                                                    value="BHA_radio2"
                                                    name="DHE_BHA"
                                                    inputProps={{ 'aria-label': 'Gas Separator' }}
                                                    label="Gas Separator"
                                                />Gas Separator</label>
                                                <label><Radio
                                                    checked={values.DHE_BHA === 'BHA_radio3'}
                                                    onChange={() => setFieldValue("DHE_BHA", "BHA_radio3")}
                                                    value="BHA_radio3"
                                                    name="DHE_BHA"
                                                    inputProps={{ 'aria-label': 'De-sander' }}
                                                    label="De-sander"
                                                />De-sander</label>

                                                {values.DHE_BHA === 'BHA_radio1' ? <div>
                                                    <CustomCheckBox name="DHE_ss" value="ss_manufacturer" label="Manufacturer" />
                                                    <CustomCheckBox name="DHE_ss" value="ss_model" label="Model" />
                                                    <CustomCheckBox name="DHE_ss" value="ss_od" label="Outer Diameter" />
                                                    <CustomCheckBox name="DHE_ss" value="ss_id" label="Inner Diameter" />
                                                    <CustomCheckBox name="DHE_ss" value="ss_other" label="Other Specs" />
                                                </div>
                                                    : values.DHE_BHA === 'BHA_radio2' ? <div>
                                                        <CustomCheckBox name="DHE_gs" value="gs_manufacturer" label="Manufacturer" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_model" label="Model" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_od" label="Outer Diameter" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_id" label="Inner Diameter" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_dtsize" label="Dip Tube Size" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_dtlength" label="Dip Tube Length" />
                                                        <CustomCheckBox name="DHE_gs" value="gs_other" label="Other Specs" />
                                                    </div> :
                                                        values.DHE_BHA === 'BHA_radio3' ? <div>
                                                            <CustomCheckBox name="DHE_ds" value="ds_manufacturer" label="Manufacturer" />
                                                            <CustomCheckBox name="DHE_ds" value="ds_model" label="Model" />
                                                            <CustomCheckBox name="DHE_ds" value="ds_od" label="Outer Diameter" />
                                                            <CustomCheckBox name="DHE_ds" value="ds_size" label="De-sander size" />
                                                            <CustomCheckBox name="DHE_ds" value="ds_other" label="Other Specs" />
                                                        </div> : null}

                                                <FieldArray
                                                    name="DHE_attr"
                                                    render={dynamicProd => (
                                                        <>
                                                            {values.DHE_attr && values.DHE_attr.length > 0 ? (
                                                                values.DHE_attr.map((DHE_attrib, index) => (
                                                                    <Grid item xs={6} sm={3}>
                                                                        <div key={index}>
                                                                            <TextField name={`DHE_attributes.${DHE_attrib.name}`} label={DHE_attrib.label}
                                                                                margin="normal"
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                //value={values.DHE_attributes[`${DHE_attrib.name}`]}
                                                                                className={classes.textField}
                                                                                helperText={touched.state && errors.state}
                                                                                error={Boolean(touched.state && errors.state)} />

                                                                            <AddCircleIcon color="primary" aria-label="add" style={{ cursor: 'pointer' }} onClick={() => { setModalShow(true) }}></AddCircleIcon>
                                                                            <RemoveCircleIcon color="secondary" aria-label="remove" style={{ cursor: 'pointer' }} onClick={() => dynamicProd.remove(index)}></RemoveCircleIcon>
                                                                        </div>
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
                                                                onExit={addDHE(dynamicProd)}
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

export default EntryForm5;