import React from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import ExampleControlSlot from './ExampleControlSlot';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

interface ResourceType {
  id: number,
  title: string,
  allDay: boolean,
  start: Date,
  end: Date,
  resourceId: number,
}

const events: ResourceType[] = [
  {
    id: 0,
    title: 'Board meeting',
    allDay: false,
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
    allDay: false,
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    allDay: false,
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: '会議室１' },
  { resourceId: 2, resourceTitle: '会議室２' },
  { resourceId: 3, resourceTitle: '会議室３' },
  { resourceId: 4, resourceTitle: 'プロジェクター' },
  { resourceId: 4, resourceTitle: 'ノートPC' },
]
// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  let views: Views = {
    MONTH: 'month',
    WEEK: 'week',
    WORK_WEEK: 'work_week',
    DAY: 'day',
    AGENDA: 'agenda',
  };
  return (
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
        defaultView={views.DAY}
        views={['day', 'work_week']}
        step={60}
        defaultDate={new Date(2018, 0, 29)}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
      />
    </>
  )
}
