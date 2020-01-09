import React from 'react';
import MaterialTable from 'material-table';
import {useDispatch, useSelector } from "react-redux"
import {
  getRoles
} from "../../services/authService";
import { actions } from "../../store/ducks/user.duck"
import { Button, Form, InputGroup, Col, Row } from "react-bootstrap";


export default function MaterialTableDemo() {
  const tableRef = React.createRef();
  const editableActions = {
    onRowAdd: newData =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();     
          dispatch(actions.addRole({ ...newData }));
        }, 600);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          dispatch(actions.editRole(newData))
        }, 600);
      }),
    onRowDelete: oldData =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
          dispatch(actions.deleteRole(oldData))
        }, 600);
      }),
  };
  const { roles } = useSelector(state => ({
    roles: state.users.roles
  }));
  const columns = [
    { title: 'Id', field: 'id', editable: 'never' },
    {
      title: 'Role',
      field: 'name',
    },
  ];

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(actions.getUserRole());
  }, []);

  return (
    <MaterialTable 
      title="Editable Example"
      columns={columns}
      tableRef={tableRef}
      data={roles}
      icons={{
        Add: () => <Button variant="primary">Add Role</Button>
      }}
      editable={editableActions}
    />
  );
}