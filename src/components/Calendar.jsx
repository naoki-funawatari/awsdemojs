import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
const myEventsList = [{
  title: "あ",
  start: new Date('2020-4-1'),
  end: new Date('2020-4-1'),
  allDay: false,
  resource: null,
}]

export default () => {
  const [events, setEvents] = useState(myEventsList);

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    setEvents(nextEvents)

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    setEvents(nextEvents)

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  return (
    // <h1>resource</h1>
    <div>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onDragStart={console.log}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
