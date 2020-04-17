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
  {
    title: 'Title',
    field: 'title',
    width: 250,
  },
  {
    title: 'ResourceType',
    field: 'resource_type_id',
    lookup: {
      1: 'person',
      2: 'room',
      3: 'device',
    },
    width: 180,
  },
  { title: 'Remarks', field: 'remarks' },
];
export default () => {
  const { resources } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResourcesAsync());
  }, [dispatch]);

  const handleRowAdd = async (newData) => {
    dispatch(postResources(newData));
    dispatch(postResourcesAsync(newData));
    return await new Promise(resolve => setTimeout(resolve, 600));
  }
  const handleRowUpdate = async (newData, oldData) => {
    if (!oldData) return await new Promise(resolve => setTimeout(resolve, 100));
    dispatch(putResources(newData));
    dispatch(putResourcesAsync(newData));
    return await new Promise(resolve => setTimeout(resolve, 600));
  }
  const handleRowDelete = async (oldData) => {
    dispatch(deleteResources(oldData));
    dispatch(deleteResourcesAsync(oldData));
    return await new Promise(resolve => setTimeout(resolve, 600));
  }

  return (
    <MaterialTable
      title="Editable Resources"
      columns={columns}
      data={resources
        .filter(resource => resource.id !== 1)
        .map(resource => ({ ...resource }))}
      editable={{
        onRowAdd: handleRowAdd,
        onRowUpdate: handleRowUpdate,
        onRowDelete: handleRowDelete,
      }}
      options={{
        paging: false,
        search: false,
        sorting: false,
        draggable: false,
      }}
    />
  );
}
