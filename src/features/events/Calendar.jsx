import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import { updateEvents, updateEventsAsync } from './events';
import { updateResourcesAsync } from './resources';
import Views from './Views';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  const { events } = useSelector(state => state);
  const dispatch = useDispatch();
  const updateAsync = useCallback(() => {
    dispatch(updateEventsAsync());
    dispatch(updateResourcesAsync());
  }, [dispatch]);

  useEffect(updateAsync, [updateAsync]);

  const handleEventDrop = ({ event, start, end, isAllDay, resourceId }) => {
    const _events = events.map(_event => {
      if (_event.id === event.id) {
        return {
          id: event.id,
          start,
          end,
          allDay: isAllDay,
          resourceId
        }
      }
      return _event;
    });
    dispatch(updateEvents(_events));
    updateAsync();
  }
  const handleEventResize = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    dispatch(updateEvents(nextEvents));
    updateAsync();
  }
  const handleSelectSlot = ({ slots, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEventId = Math.max(...[0, ...events.map(e => e.id)]) + 1;
      const allDay = slots.length === 1;
      dispatch(updateEvents([
        ...events,
        { id: newEventId, title, allDay, start, end, resourceId: resourceId || 1 }
      ]));
    }
    updateAsync();
  }
  const handleDoubleClickEvent = ({ id, allDay, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const idx = events.findIndex(event => event.id === id);
      const updatedEvent = { id, title, allDay, start, end, resourceId: resourceId || 1 };
      const nextEvents = [...events];
      nextEvents.splice(idx, 1, updatedEvent);
      dispatch(updateEvents(nextEvents));
    }
    updateAsync();
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
