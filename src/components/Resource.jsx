import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import Views from '../consts/Views';
import { updateEvents } from '../stores/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  const { events, resources } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay, resourceId: resourceId || 1 };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    dispatch(updateEvents(nextEvents));
  }

  const handleEventResize = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    dispatch(updateEvents(nextEvents));
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
  }

  const handleNavigate = (newDate, view, action) => {
    console.log(newDate);
    console.log(view);
    console.log(action);
  }

  const handleRangeChange = (range, view) => {
    console.log(range);
    console.log(view);
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
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
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
