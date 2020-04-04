import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import Views from '../consts/Views';
import Resources from '../consts/Resources';
import Events from '../consts/Events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  return (
    <DragAndDropCalendar
      localizer={localizer}
      views={['day', 'work_week']}
      defaultView={Views.DAY}
      step={15}
      resources={Resources}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      events={Events}
    // defaultDate={new Date(20, 0, 29)}
    />
  );
}
