import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  getResourcesAsync,
  postResources, postResourcesAsync,
  putResources, putResourcesAsync,
  deleteResources, deleteResourcesAsync,
} from './resourcesSlice';
import MaterialTable from 'material-table';

const columns = [
  { title: 'Title', field: 'title' },
  { title: 'ResourceType', field: 'resource_type_title' },
  { title: 'Remarks', field: 'remarks' },
];
export default () => {
  const { resources } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResourcesAsync());
  }, [dispatch]);

  const handleRowAdd = async (newData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log(newData)
    dispatch(postResources(newData));
    dispatch(postResourcesAsync(newData));
  }
  const handleRowUpdate = async (newData, oldData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (!oldData) return;
    dispatch(putResources(newData));
    dispatch(putResourcesAsync(newData));
  }
  const handleRowDelete = async (oldData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    dispatch(deleteResources(oldData));
    dispatch(deleteResourcesAsync(oldData));
  }

  return (
    <MaterialTable
      title="Editable Resources"
      columns={columns}
      data={resources.map(resource => ({ ...resource }))}
      editable={{
        onRowAdd: handleRowAdd,
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleRowDelete,
      }}
    />
  );
}
