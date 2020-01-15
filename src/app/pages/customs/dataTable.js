import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from "react-redux"
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import {getUsersList } from '../../services/userManagementService';
import { deleteUserById } from "../../services/authService";
import { actions } from "../../store/ducks/user.duck"

const deleteIdArray = [];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

// const headCells = [
//     { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
//     { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
//     // { id: 'last_name', numeric: false, disablePadding: false, label: 'LastName' },
//     { id: 'role_name', numeric: false, disablePadding: false, label: 'Role' },
//     { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
// ];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    const columnsNames = headCells ? headCells.slice().concat({ id: 'actions', numeric: false, disablePadding: false, label: 'Actions' }) : [];
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected > 0 && rowCount > 0 &&  numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all users' }}
                    />
                </TableCell>
                {columnsNames && columnsNames.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
        </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        {/* Nutrition */}
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        {/* <DeleteIcon /> */}
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


function EnhancedTable(props) {
    const classes = useStyles();
    const { getDataList, deleteData, editRouteLink, columns, headCells } = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('email');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getDataList());
    }, [])
    

    React.useEffect(() => {
            // getUsersList(page,rowsPerPage).then((data) => {
            //     if(data.status == 200){
            //         if(data.data.data.total_count > 0){
            //             setRows(data.data.data.items);
            //         }
            //         else {
            //             alert("No data Found");
            //         }
            //     }
            //     else{
            //         alert("Something went wrong");
            //     }
            //   })
            //   .catch(() => {
            //       console.log('error');
            //   });
      },[]);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };
    
    const getData = () => {
        const { users, companies, dataType } = props;
        switch (dataType) {
            case "users":
                return users;
            case "companies":
                return companies;
            default:
                return [];
        }
    }

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = data.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    //custom delete methods
    const handleClickDelete = (event, id) => {
        // deleteIdArray.push(userid);
        // deleteUserById(userid).then((data)=>{
        //     window.location.reload();
        // })
        dispatch(deleteData(id))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = id => selected.indexOf(id) !== -1;
    const data = getData();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {stableSort(data, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                onClick={event => handleClick(event, row.id)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        {columns && columns.map((column, index) => {
                                            return <TableCell component="th" id={index} scope="row" padding="none">
                                                {row[column]}
                                            </TableCell>
                                        })}
                                        {/* <TableCell align="left">{row.first_name} {row.last_name}</TableCell> */}
                                        {/* <TableCell align="left">{}</TableCell> */}
                                        {/* <TableCell align="left">{row.role_name}</TableCell> */}
                                        {/* <TableCell align="left"><IconButton color="primary" aria-label="edit" onClick={event => handleClickEdit(event, row.userid)}> */}
                                        <TableCell align="left"><IconButton color="primary" aria-label="edit">
                                            <Link to={`${editRouteLink}/${row.id}`}>
                                            <EditIcon />
                                            </Link>
                                        </IconButton><IconButton style={{ color: '#fd397a' }} aria-label="delete" onClick={event => handleClickDelete(event, row.id)}>
                                                <DeleteIcon />
                                            </IconButton></TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[2, 4, 10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

const mapStateToProps = store => ({
    users: store.users.userList,
    companies: store.companies.companyList
});

export default connect(mapStateToProps)(EnhancedTable);