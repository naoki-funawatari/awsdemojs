import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import Events from '../consts/Events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  const [events, setEvents] = useState([...Events]);

  const handleEventDrop = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  const handleEventResize = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
    // alert(`${event.title} was resized to ${start}-${end}`)
  }

  const handleSelectSlot = (event) => {
    const title = window.prompt('New Event name');
    if (title) {
    }
    let idList = events.map(a => a.id);
    let newId = Math.max(...idList) + 1
    let hour = {
      id: newId,
      title,
      allDay: event.slots.length === 1,
      start: event.start,
      end: event.end,
    }
    setEvents([...events, hour]);
  }

  const handleDoubleClickEvent = ({ id, allDay, start, end, resourceId }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const idx = events.findIndex(event => event.id === id);
      const updatedEvent = {
        id,
        title,
        allDay,
        start,
        end,
        resourceId,
      };
      const nextEvents = [...events];
      nextEvents.splice(idx, 1, updatedEvent);
      setEvents(nextEvents);
    }
  }

  return (
    <DragAndDropCalendar
      localizer={localizer}
      style={{ height: 500 }}
      selectable
      resizable
      events={events}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onSelectSlot={handleSelectSlot}
      onDoubleClickEvent={handleDoubleClickEvent}
      defaultDate={new Date()}
    />
  );
};
