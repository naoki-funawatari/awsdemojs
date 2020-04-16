import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getResourcesAsync } from './resourcesSlice';
import MaterialTable from 'material-table';

export default () => {
  const { resources } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResourcesAsync());
  }, [dispatch]);

  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      columns: [
        { title: 'Title', field: 'title' },
        { title: 'ResourceType', field: 'resource_type_title' },
        { title: 'Remarks', field: 'remarks' },
      ],
      data: resources.map(resource => ({ ...resource })),
    });
    console.table(resources);
    console.table([...resources]);
    console.table(resources.map(resource => ({ ...resource })));
  }, [resources]);

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
