import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  postEvents, postEventsAsync,
  putEvents, putEventsAsync,
  deleteEvents, deleteEventsAsync
} from './eventsSlice';
import { closeEventDialog } from './eventDialogSlice';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import { TwitterPicker } from 'react-color';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
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
  formControl: {
    marginTop: 8,
    marginBottom: 16,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(resourceId, selectedResourceIds, theme) {
  return {
    fontWeight:
      selectedResourceIds
        .indexOf(resourceId) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const colors = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];

export default ({ view, range }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { resources, eventDialog } = useSelector(state => state);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [isDelete, setDelete] = useState(false);
  const [selectedResourceIds, setSelectedResourceIds] = useState([]);
  const [color, setColor] = useState('');
  const { isOpen, isNew, id, start, end, allDay, resourceIds } = eventDialog;
  const handleChange = event => setSelectedResourceIds(event.target.value);
  const handleClose = () => dispatch(closeEventDialog());
  const handleSubmit = () => {
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
      resourceIds: selectedResourceIds,
      color,
    }
    if (isNew) {
      dispatch(postEvents({ ...newEvent }));
      dispatch(postEventsAsync({ ...newEvent }, view, range));
    } else {
      if (isDelete) {
        dispatch(deleteEvents({ id }));
        dispatch(deleteEventsAsync({ id }, view, range));
      } else {
        dispatch(putEvents({ ...newEvent }));
        dispatch(putEventsAsync({ ...newEvent }, view, range));
      }
    }
    dispatch(closeEventDialog());
  }

  useEffect(() => {
    setTitle(eventDialog.title);
    setDelete(false);
  }, [eventDialog]);

  useEffect(() => {
    setSelectedResourceIds(resourceIds);
  }, [resourceIds]);

  useEffect(() => {
    if (eventDialog.isNew) {
      setColor(colors[Math.floor(colors.length * Math.random())]);
    } else {
      setColor(eventDialog.color);
    }
  }, [eventDialog])

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
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="mutiple-resource-label">Resource</InputLabel>
          <Select
            labelId="mutiple-resource-label"
            id="mutiple-resource"
            multiple
            value={selectedResourceIds}
            onChange={handleChange}
            input={<Input id="select-multiple-resource" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={resources.find(resource => resource.id === value).title}
                    className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}>
            {resources.map(resource => (
              <MenuItem
                key={resource.id}
                value={resource.id}
                style={getStyles(resource.id, selectedResourceIds, theme)}>
                {resource.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TwitterPicker
          width={552}
          triangle="hide"
          color={color}
          onChangeComplete={color => setColor(color.hex)} />
      </DialogContent>
      <DialogActions className={classes.controls}>
        <div className={classes.flexLeft}>
          {!isNew && <FormControlLabel
            control={<Checkbox
              color="default"
              checked={isDelete}
              onChange={e => setDelete(e.target.checked)}
            />}
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
