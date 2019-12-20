import React from 'react';
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, FieldArray, Field } from "formik";
import { TextField, Select } from "@material-ui/core";
import Modal from "react-bootstrap/Modal";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DatePickerEx from '../../../customs/CustomDatePicker';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import ReactFileReader from 'react-file-reader';
import CloudDownloadTwoToneIcon from '@material-ui/icons/CloudDownloadTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
        value.well_attr = Object.keys(value.well_attributes).map(title => ({ name: title, label: title.replace(/\s/g, ' ') }));//add space in label title
        return value;
    }
    return {
        invoiceto: "",
        date: new Date(),
        lease: "",
        well_no: "",
        field: "",
        country: "",
        state: "",
        well_id: "",
        well_api1: "",
        well_api2: "", well_name: "", well_spud_date: new Date(), well_cmpltn_date: new Date(),
        well_first_prod_date: new Date(), well_tmd: "", well_tvd: "", well_lateral_length: "", well_toc: "", well_kbe: "", well_gle: "", well_dsu_id: "", well_shl_lati: "", well_shl_longi: "",
        well_bhl_lati: "", well_bhl_longi: "", well_shl: "",
        well_attributes: {},
        well_attr: [],
    };
};

const dummy = {
    invoiceto: "",
    date: "",
    lease: "",
    well: "",
    field: "",
    country: "",
    state: "",
    well_attributes: {
        iutyu: "ghghjh",
        lkhjj: "jggjhhj",
        uyioyioy: "gghjjg",
    },
    well_attr: [],
}

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

    const handleSubmitModal = () => {
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
                    onClick={handleSubmitModal}
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
    // data.well_attributes = data.well_attr;
    delete data.well_attr;
    console.log(data);
    return data;
}

const EntryForm = ({ onSubmit, value }) => {
    const classes = useStyles();
    var csvFields = [];
    const [modalShow, setModalShow] = React.useState(false);

    const addRole = mutator => title => {
        mutator.push({ name: title.replace(/\s/g, '_'), label: title })//remove space from title name
        debugger
    };

    const handleFiles = files => {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            // Use reader.result
            
            csvFields.push(reader.result);
            csvFields = csvFields[0].split("\n").slice(1, -1);
            console.log(csvFields);
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Formik
                                initialValues={getInitialValue(value)}
                                // enableReinitialize
                                validate={values => {
                                    const errors = {};

                                    // if (!values.invoiceto) {
                                    //     errors.invoiceto = "Required Field"
                                    // }
                                    // if(!values.lease) {
                                    //     errors.lease = "Required Field"
                                    // }
                                    // if(!values.well_no){
                                    //     errors.well_no="Required Field";
                                    // } else if(!/@^\d$/.test(values.well_no)){
                                    //     errors.well_no="Invalid! Please enter numbers";
                                    // }
                                    // if(!values.well_id) {
                                    //     errors.well_id = "Required Field"
                                    // }
                                    // if(!values.well_api1) {
                                    //     errors.well_api1 = "Required Field"
                                    // }
                                    // if(!values.well_api2) {
                                    //     errors.well_api2 = "Required Field"
                                    // }
                                    // if(!values.well_name) {
                                    //     errors.well_name = "Required Field"
                                    // }
                                    // if(!values.well_tmd) {
                                    //     errors.well_tmd = "Required Field"
                                    // }
                                    // if(!values.well_tvd) {
                                    //     errors.well_tvd = "Required Field"
                                    // }
                                    // if(!values.well_lateral_length) {
                                    //     errors.well_lateral_length = "Required Field"
                                    // }
                                    // if(!values.well_toc) {
                                    //     errors.well_toc = "Required Field"
                                    // }
                                    // if(!values.well_kbe) {
                                    //     errors.well_kbe = "Required Field"
                                    // }
                                    // if(!values.well_gle) {
                                    //     errors.well_gle = "Required Field"
                                    // }
                                    // if(!values.well_dsu_id) {
                                    //     errors.well_dsu_id = "Required Field"
                                    // }
                                    // if(!values.well_shl_lati) {
                                    //     errors.well_shl_lati = "Required Field"
                                    // }
                                    // if(!values.well_shl_longi) {
                                    //     errors.well_shl_longi = "Required Field"
                                    // }
                                    // if(!values.well_bhl_lati) {
                                    //     errors.well_bhl_lati = "Required Field"
                                    // }
                                    // if(!values.well_bhl_longi) {
                                    //     errors.well_bhl_longi = "Required Field"
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
                                                        <Grid item xs={12} sm={6}>
                                                            <TextField
                                                                id="invoiceto"
                                                                label="Invoive To"
                                                                multiline
                                                                className={classes.textField}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.invoiceto}
                                                                margin="normal"
                                                                helperText={touched.invoiceto && errors.invoiceto}
                                                                error={Boolean(touched.invoiceto && errors.invoiceto)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            {/* <Field component={FormikDatePicker} name="date" /> */}
                                                            <DatePickerEx label="Date" name="date" value={values.date} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Field"
                                                                margin="normal"
                                                                name="field"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.field}
                                                                className={classes.textField}
                                                                helperText={touched.field && errors.field}
                                                                error={Boolean(touched.field && errors.field)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}></Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Lease"
                                                                margin="normal"
                                                                name="lease"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.lease}
                                                                className={classes.textField}
                                                                helperText={touched.lease && errors.lease}
                                                                error={Boolean(touched.lease && errors.lease)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Well No."
                                                                margin="normal"
                                                                name="well_no"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_no}
                                                                className={classes.textField}
                                                                helperText={touched.well_no && errors.well_no}
                                                                error={Boolean(touched.well_no && errors.well_no)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}></Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Country"
                                                                margin="normal"
                                                                name="country"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.email}
                                                                className={classes.textField}
                                                                helperText={touched.country && errors.country}
                                                                error={Boolean(touched.country && errors.country)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="State"
                                                                margin="normal"
                                                                name="state"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.state}
                                                                className={classes.textField}
                                                                helperText={touched.state && errors.state}
                                                                error={Boolean(touched.state && errors.state)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Unique Well ID"
                                                                margin="normal"
                                                                name="well_id"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_id}
                                                                className={classes.textField}
                                                                helperText={touched.well_id && errors.well_id}
                                                                error={Boolean(touched.well_id && errors.well_id)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="API 1#"
                                                                margin="normal"
                                                                name="well_api1"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_api1}
                                                                className={classes.textField}
                                                                helperText={touched.well_api1 && errors.well_api1}
                                                                error={Boolean(touched.well_api1 && errors.well_api1)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="API 2#"
                                                                name="well_api2"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_api2}
                                                                className={classes.textField}
                                                                helperText={touched.well_api2 && errors.well_api2}
                                                                error={Boolean(touched.well_api2 && errors.well_api2)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Well Name"
                                                                margin="normal"
                                                                name="well_name"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_name}
                                                                className={classes.textField}
                                                                helperText={touched.well_name && errors.well_name}
                                                                error={Boolean(touched.well_name && errors.well_name)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <DatePickerEx label="Spud Date" name="well_spud_date" value={values.well_spud_date} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <DatePickerEx label="Completion Date" name="well_cmpltn_date" value={values.well_cmpltn_date} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <DatePickerEx label="First Production Date" name="well_first_prod_date" value={values.well_first_prod_date} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Total Measured Depth (TMD/MD)"
                                                                margin="normal"
                                                                name="well_tmd"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_tmd}
                                                                className={classes.textField}
                                                                helperText={touched.well_tmd && errors.well_tmd}
                                                                error={Boolean(touched.well_tmd && errors.well_tmd)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                label="Total Vertical Depth (TVD)"
                                                                margin="normal"
                                                                name="well_tvd"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.well_tvd}
                                                                className={classes.textField}
                                                                helperText={touched.well_tvd && errors.well_tvd}
                                                                error={Boolean(touched.well_tvd && errors.well_tvd)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Lateral Length"
                                                            margin="normal"
                                                            name="well_lateral_length"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_lateral_length}
                                                            className={classes.textField}
                                                            helperText={touched.well_lateral_length && errors.well_lateral_length}
                                                            error={Boolean(touched.well_lateral_length && errors.well_lateral_length)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Top of Cement"
                                                            margin="normal"
                                                            name="well_toc"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_toc}
                                                            className={classes.textField}
                                                            helperText={touched.well_toc && errors.well_toc}
                                                            error={Boolean(touched.well_toc && errors.well_toc)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Kelly Bushing Elevation (KB)"
                                                            margin="normal"
                                                            name="well_kbe"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_kbe}
                                                            className={classes.textField}
                                                            helperText={touched.well_kbe && errors.well_kbe}
                                                            error={Boolean(touched.well_kbe && errors.well_kbe)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Ground Level Elevation (GL)"
                                                            margin="normal"
                                                            name="well_gle"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_gle}
                                                            className={classes.textField}
                                                            helperText={touched.well_gle && errors.well_gle}
                                                            error={Boolean(touched.well_gle && errors.well_gle)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Drilling Spacing Unit ID"
                                                            margin="normal"
                                                            name="well_dsu_id"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_dsu_id}
                                                            className={classes.textField}
                                                            helperText={touched.well_dsu_id && errors.well_dsu_id}
                                                            error={Boolean(touched.well_dsu_id && errors.well_dsu_id)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Surface Hole Location(latitudinal)"
                                                            margin="normal"
                                                            name="well_shl_lati"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_shl_lati}
                                                            className={classes.textField}
                                                            helperText={touched.well_shl_lati && errors.well_shl_lati}
                                                            error={Boolean(touched.well_shl_lati && errors.well_shl_lati)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Surface Hole Location(longitudinal)"
                                                            margin="normal"
                                                            name="well_shl_longi"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_shl_longi}
                                                            className={classes.textField}
                                                            helperText={touched.well_shl_longi && errors.well_shl_longi}
                                                            error={Boolean(touched.well_shl_longi && errors.well_shl_longi)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Bottom Hole Location(latitudinal)"
                                                            margin="normal"
                                                            name="well_bhl_lati"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_bhl_lati}
                                                            className={classes.textField}
                                                            helperText={touched.well_bhl_lati && errors.well_bhl_lati}
                                                            error={Boolean(touched.well_bhl_lati && errors.well_bhl_lati)}
                                                        /></Grid>
                                                        <Grid item xs={6} sm={3}><TextField
                                                            label="Bottom Hole Location(longitudinal)"
                                                            margin="normal"
                                                            name="well_bhl_longi"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.well_bhl_longi}
                                                            className={classes.textField}
                                                            helperText={touched.well_bhl_longi && errors.well_bhl_longi}
                                                            error={Boolean(touched.well_bhl_longi && errors.well_bhl_longi)}
                                                        /></Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormLabel component="legend">Surface Hole Location (congressional)</FormLabel>
                                                            <label><Radio
                                                                checked={values.well_shl === 'quarter'}
                                                                onChange={() => setFieldValue("well_shl", "quarter")}
                                                                value="quarter"
                                                                name="well_shl"
                                                                inputProps={{ 'aria-label': 'Quarter' }}
                                                                label="Quarter"
                                                            />Quarter</label>
                                                            <label><Radio
                                                                checked={values.well_shl === 'section'}
                                                                onChange={() => setFieldValue("well_shl", "section")}
                                                                value="section"
                                                                name="well_shl"
                                                                inputProps={{ 'aria-label': 'Section' }}
                                                                label="Section"
                                                            />Section</label>
                                                            <label><Radio
                                                                checked={values.well_shl === 'township'}
                                                                onChange={() => setFieldValue("well_shl", "township")}
                                                                value="township"
                                                                name="well_shl"
                                                                inputProps={{ 'aria-label': 'Township' }}
                                                            />Township</label>
                                                            <label><Radio
                                                                checked={values.well_shl === 'range'}
                                                                onChange={() => setFieldValue("well_shl", "range")}
                                                                value="range"
                                                                name="well_shl"
                                                                inputProps={{ 'aria-label': 'Range' }}
                                                            />Range</label>
                                                        </Grid>

                                                        <FieldArray
                                                            name="well_attr"
                                                            render={dynamicArray => (
                                                                <>
                                                                    {values.well_attr && values.well_attr.length > 0 ? (
                                                                        values.well_attr.map((well_attrib, index) => (
                                                                            <Grid key={well_attrib.name} item xs={6} sm={3}>
                                                                                <TextField name={`well_attributes.${well_attrib.name}`} label={well_attrib.label}
                                                                                    margin="normal"
                                                                                    onBlur={handleBlur}
                                                                                    onChange={handleChange}
                                                                                    value={values.well_attributes[`${well_attrib.name}`]}
                                                                                    className={classes.textField}
                                                                                    helperText={touched.state && errors.state}
                                                                                    error={Boolean(touched.state && errors.state)} />

                                                                                <AddCircleIcon color="primary" aria-label="add" style={{ cursor: 'pointer' }} onClick={() => { setModalShow(true) }}></AddCircleIcon>
                                                                                <RemoveCircleIcon color="secondary" aria-label="remove" style={{ cursor: 'pointer' }} onClick={() => dynamicArray.remove(well_attrib.name)}></RemoveCircleIcon>
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
                                                                        onExit={addRole(dynamicArray)}
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
                        </MuiPickersUtilsProvider>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EntryForm;