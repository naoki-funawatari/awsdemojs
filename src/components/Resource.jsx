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

// import React from 'react';
// import { Calendar, Views } from 'react-big-calendar';
// import ExampleControlSlot from '../ExampleControlSlot';

// const events = [
//   {
//     id: 0,
//     title: 'Board meeting',
//     start: new Date(2018, 0, 29, 9, 0, 0),
//     end: new Date(2018, 0, 29, 13, 0, 0),
//     resourceId: 1,
//   },
//   {
//     id: 1,
//     title: 'MS training',
//     allDay: true,
//     start: new Date(2018, 0, 29, 14, 0, 0),
//     end: new Date(2018, 0, 29, 16, 30, 0),
//     resourceId: 2,
//   },
//   {
//     id: 2,
//     title: 'Team lead meeting',
//     start: new Date(2018, 0, 29, 8, 30, 0),
//     end: new Date(2018, 0, 29, 12, 30, 0),
//     resourceId: 3,
//   },
//   {
//     id: 11,
//     title: 'Birthday Party',
//     start: new Date(2018, 0, 30, 7, 0, 0),
//     end: new Date(2018, 0, 30, 10, 30, 0),
//     resourceId: 4,
//   },
// ]

// const resourceMap = [
//   { resourceId: 1, resourceTitle: 'Board room' },
//   { resourceId: 2, resourceTitle: 'Training room' },
//   { resourceId: 3, resourceTitle: 'Meeting room 1' },
//   { resourceId: 4, resourceTitle: 'Meeting room 2' },
// ]

// export default ({ localizer }) => (
//   <>
//     <Calendar
//       events={events}
//       localizer={localizer}
//       defaultView={Views.DAY}
//       views={['day', 'work_week']}
//       step={60}
//       defaultDate={new Date(2018, 0, 29)}
//       resources={resourceMap}
//       resourceIdAccessor="resourceId"
//       resourceTitleAccessor="resourceTitle"
//     />
//   </>
// )
