import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import {
  getEventsAsync,
  postEventsAsync,
  putEventsAsync,
  deleteEventsAsync,
  getParsedEvents
} from './events';
import { updateResourcesAsync } from './resources';
import Views from './Views';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default ({ location }) => {
  if (location === "/calendar") {

  }
  if (location === "/resource") {

  }
  const events = getParsedEvents();
  const { resources } = useSelector(state => state);
  const dispatch = useDispatch();
  const updateAsync = useCallback(() => {
    dispatch(getEventsAsync());
    dispatch(updateResourcesAsync());
  }, [dispatch]);

  useEffect(updateAsync, [updateAsync]);

  const handleEventDrop = ({ event, start, end, isAllDay, resourceId }) => {
    dispatch(putEventsAsync({
      id: event.id,
      title: event.title,
      start,
      end,
      allDay: !!isAllDay,
      resourceId
    }));
  }
  const handleEventResize = ({ event, start, end }) => {
    dispatch(putEventsAsync({
      id: event.id,
      title: event.title,
      start,
      end,
      allDay: event.allDay,
      resourceId: event.resourceId
    }));
  }
  const handleSelectSlot = ({ slots, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      dispatch(postEventsAsync({
        title,
        start,
        end,
        allDay: slots.length === 1,
        resourceId: resourceId || 1
      }));
    }
  }
  const handleDoubleClickEvent = ({ id, allDay, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      if (title === "delete") {
        dispatch(deleteEventsAsync({ id }));
      } else {
        dispatch(putEventsAsync({
          id,
          title,
          start,
          end,
          allDay,
          resourceId
        }));
      }
    }
  }
  const handleNavigate = (newDate, view, action) => {
    // console.log(newDate);
    // console.log(view);
    // console.log(action);
    updateAsync();
  }
  const handleRangeChange = (range, view) => {
    // console.log(range);
    // console.log(view);
    updateAsync();
  }

  return (
    <DragAndDropCalendar
      localizer={localizer}
      style={{ height: 700 }}
      views={Object.values(Views)}
      defaultView={Views.DAY}
      step={15}
      min={moment('07:00am', 'h:mma').toDate()}
      max={moment('21:00pm', 'h:mma').toDate()}
      selectable
      resizable
      resources={resources}
      events={events}
      onNavigate={handleNavigate}
      onRangeChange={handleRangeChange}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onSelectSlot={handleSelectSlot}
      onDoubleClickEvent={handleDoubleClickEvent}
      defaultDate={new Date()}
    />
  );
}
