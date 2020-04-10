import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import {
  getEventsAsync,
  postEvents, postEventsAsync,
  putEvents, putEventsAsync,
  deleteEvents, deleteEventsAsync
} from './events';
import { updateResourcesAsync } from './resources';
import Views from './Views';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default ({ location }) => {
  const { resources, events } = useSelector(state => state);
  const dispatch = useDispatch();
  const updateAsync = useCallback(() => {
    dispatch(getEventsAsync());
    dispatch(updateResourcesAsync());
  }, [dispatch]);

  useEffect(updateAsync, [updateAsync]);

  const handleEventDrop = ({ event, start, end, isAllDay, resourceId }) => {
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: !!isAllDay,
      resourceId
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }));
  }
  const handleEventResize = ({ event, start, end }) => {
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: event.allDay,
      resourceId: event.resourceId
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }));
  }
  const handleSelectSlot = ({ slots, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = {
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        allDay: slots.length === 1,
        resourceId: resourceId || 1
      }
      dispatch(postEvents({ ...newEvent }));
      dispatch(postEventsAsync({ ...newEvent }));
    }
  }
  const handleDoubleClickEvent = ({ id, allDay, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      if (title === "delete") {
        dispatch(deleteEvents({ id }));
        dispatch(deleteEventsAsync({ id }));
      } else {
        const newEvent = {
          id,
          title,
          start: start.toISOString(),
          end: end.toISOString(),
          allDay,
          resourceId
        }
        dispatch(putEvents({ ...newEvent }));
        dispatch(putEventsAsync({ ...newEvent }));
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
      resources={location.pathname === "/schedules" ? resources : null}
      events={events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }))}
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
