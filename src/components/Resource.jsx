import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import ExampleControlSlot from './ExampleControlSlot';
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]
// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => (
  <>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>
        Click an event to see more info, or drag the mouse over the calendar
        to select a date/time range.
    </strong>
    </ExampleControlSlot.Entry>
    <DragAndDropCalendar
      events={events}
      localizer={localizer}
      defaultView={Views.DAY}
      views={['day', 'work_week']}
      step={60}
      defaultDate={new Date(2018, 0, 29)}
      resources={resourceMap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
    />
  </>
)
