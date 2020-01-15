import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import EnhancedCompanyTable from "../../customs/dataTable";
import { actions } from '../../../store/ducks/company.duck';


export default function CompanyEdit() {
    
    return (
        <>
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Company List</h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                    <Link to="/company/create">
                        <Tooltip TransitionComponent={Zoom} title="Create New User" placement="bottom">
                            <Button size="large" variant="contained" style={{ backgroundColor: '#5d78ff' }} color="primary" >
                                Create Company
                        </Button>
                        </Tooltip>
                    </Link>
                </div>
            </div>
            <div className="kt-portlet__body">
                <div className="kt-widget4">
                    <EnhancedCompanyTable
                        dataType="companies"
                        getDataList={actions.getCompanyList}
                        deleteData={actions.deleteCompany}
                        editRouteLink="/company/create"
                        columns={["id", "name", "description"]}
                        headCells={[
                                { id: 'id', numeric: false, disablePadding: true, label: 'id' },
                                { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                                { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
                            ]}
                    />
                </div>
            </div>
        </>
    );
}