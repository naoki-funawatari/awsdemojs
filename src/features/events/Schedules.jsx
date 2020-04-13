import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import {
  getEventsAsync,
  putEvents, putEventsAsync,
} from './eventsSlice';
import { getResourcesAsync } from './resourcesSlice';
import { openEventDialog } from './eventDialogSlice';
import Views from './Views';
import EventDialog from './EventDialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default ({ location }) => {
  const { resources, events } = useSelector(state => state);
  const dispatch = useDispatch();
  const updateAsync = useCallback(() => {
    dispatch(getEventsAsync());
    dispatch(getResourcesAsync());
  }, [dispatch]);

  useEffect(updateAsync, [updateAsync]);

  const handleEventDrop = ({ event, start, end, isAllDay, resourceId }) => {
    const resourceIds = events
      .filter(_event => _event.id === event.id)
      .map(_event => _event.resourceId === event.resourceId
        ? resourceId ?? event.resourceId
        : _event.resourceId);
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: !!isAllDay,
      resourceIds: [...new Set(resourceIds)]
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }));
  }
  const handleEventResize = ({ event, start, end }) => {
    const resourceIds = events
      .filter(_event => _event.id === event.id)
      .map(_event => _event.resourceId);
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: event.allDay,
      resourceIds
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }));
  }
  const handleSelectSlot = ({ slots, start, end, resourceId }) => {
    dispatch(openEventDialog({
      isOpen: true,
      isNew: true,
      title: '',
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: slots.length === 1,
      resourceIds: [resourceId || 1]
    }));
  }
  const handleDoubleClickEvent = ({ id, title, allDay, start, end }) => {
    const resourceIds = events
      .filter(event => event.id === id)
      .map(event => event.resourceId);
    dispatch(openEventDialog({
      isOpen: true,
      isNew: false,
      id,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      resourceIds
    }));
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

  return (<>
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
      events={location.pathname === "/schedules"
        ? events.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
        : events
          .filter(event => event.resourceId === 1)
          .map(event => ({
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
    <EventDialog />
  </>);
}
