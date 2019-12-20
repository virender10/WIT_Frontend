import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import EnhancedUserTable from "../../../customs/UserTable";
// import { getUsers } from "../../../../services/userManagementService";


export default function UserEdit() {
    
    return (
        <>
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">User List</h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                    <Link to="/user-management/Users/CreateUser">
                        <Tooltip TransitionComponent={Zoom} title="Create New User" placement="bottom">
                            <Button size="large" variant="contained" style={{ backgroundColor: '#5d78ff' }} color="primary" >
                                New User
                        </Button>
                        </Tooltip>
                    </Link>
                </div>
            </div>
            <div className="kt-portlet__body">
                <div className="kt-widget4">
                    <EnhancedUserTable />
                </div>
            </div>
        </>
    );
}