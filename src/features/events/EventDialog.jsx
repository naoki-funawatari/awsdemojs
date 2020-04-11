import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  postEvents, postEventsAsync,
  putEvents, putEventsAsync,
  deleteEvents, deleteEventsAsync
} from './events';
import { closeEventDialog } from './eventDialogSlice';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const inputTitle = useRef(null);
  const { eventDialog } = useSelector(state => state);
  const { isOpen, isNew, id, title, start, end, allDay, resourceId } = eventDialog;
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeEventDialog());
  const handleSubmit = () => {
    const inputTitleValue = inputTitle.current.value;
    const newEvent = {
      id,
      title: inputTitleValue,
      start,
      end,
      allDay,
      resourceId
    }
    if (isNew) {
      dispatch(postEvents({ ...newEvent }));
      dispatch(postEventsAsync({ ...newEvent }));
    } else {
      if (inputTitleValue) {
        if (inputTitleValue === "delete") {
          dispatch(deleteEvents({ id }));
          dispatch(deleteEventsAsync({ id }));
        } else {
          dispatch(putEvents({ ...newEvent }));
          dispatch(putEventsAsync({ ...newEvent }));
        }
      }
    }
    dispatch(closeEventDialog());
  }

  return (
    <Dialog
      key={JSON.stringify(eventDialog)}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"sm"}>
      <DialogTitle id="form-dialog-title">
        {`${isNew ? 'New' : 'Edit'} Event`}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText> */}
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Title"
          fullWidth
          defaultValue={title}
          inputRef={inputTitle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
