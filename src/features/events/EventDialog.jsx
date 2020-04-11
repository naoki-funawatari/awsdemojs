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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 0,
  },
  flexLeft: {
    flexGrow: 1,
    paddingLeft: 16,
    textAlign: 'left',
  },
  flexRight: {
    flexGrow: 1,
    paddingRight: 8,
    textAlign: 'right',
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const inputTitle = useRef(null);
  const inputDelete = useRef(null);
  const { eventDialog } = useSelector(state => state);
  const { isOpen, isNew, id, title, start, end, allDay, resourceId } = eventDialog;
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeEventDialog());
  const handleSubmit = () => {
    const title = `${inputTitle.current.value}`.trim();
    const isDelete = !isNew && inputDelete.current.checked;

    if (!isDelete && title === '') {
      alert('Title を入力してください。');
      return;
    }

    const newEvent = {
      id,
      title,
      start,
      end,
      allDay,
      resourceId
    }
    if (isNew) {
      dispatch(postEvents({ ...newEvent }));
      dispatch(postEventsAsync({ ...newEvent }));
    } else {
      if (isDelete) {
        dispatch(deleteEvents({ id }));
        dispatch(deleteEventsAsync({ id }));
      } else {
        dispatch(putEvents({ ...newEvent }));
        dispatch(putEventsAsync({ ...newEvent }));
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
      <DialogActions className={classes.controls}>
        <div className={classes.flexLeft}>
          {!isNew && <FormControlLabel
            control={<Checkbox color="default" inputRef={inputDelete} />}
            label="delete" />}
        </div>
        <div className={classes.flexRight}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
