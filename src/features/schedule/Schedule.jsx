import React, { useEffect, useRef, useCallback } from 'react';
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
  const view = useRef(Views.DAY);
  const range = useRef([new Date()]);
  const isMore = useRef(false);
  const { resources, events } = useSelector(state => state);
  const dispatch = useDispatch();
  const updateAsync = useCallback(() => {
    dispatch(getEventsAsync(view.current, range.current));
    dispatch(getResourcesAsync());
  }, [dispatch]);

  useEffect(updateAsync, [updateAsync]);

  const handleEventDrop = ({ event, start, end, isAllDay, resourceId }) => {
    const resourceIds = events
      .filter(_event => _event.id === event.id)
      .map(_event => _event.resourceId === event.resourceId
        ? resourceId ?? event.resourceId
        : _event.resourceId);
    const color = events.find(_event => _event.id === event.id).color;
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: !!isAllDay,
      resourceIds: [...new Set(resourceIds)],
      color,
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }, view.current, range.current));
  }
  const handleEventResize = ({ event, start, end }) => {
    const resourceIds = events
      .filter(_event => _event.id === event.id)
      .map(_event => _event.resourceId);
    const color = events.find(_event => _event.id === event.id).color;
    const newEvent = {
      id: event.id,
      title: event.title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: event.allDay,
      resourceIds,
      color,
    }
    dispatch(putEvents({ ...newEvent }));
    dispatch(putEventsAsync({ ...newEvent }, view.current, range.current));
  }
  const handleSelectSlot = ({ slots, start, end, resourceId }) => {
    dispatch(openEventDialog({
      isOpen: true,
      isNew: true,
      title: '',
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: slots.length === 1,
      resourceIds: [resourceId || 1],
      color: null,
    }));
  }
  const handleDoubleClickEvent = ({ id, title, allDay, start, end }) => {
    const resourceIds = events
      .filter(event => event.id === id)
      .map(event => event.resourceId);
    const color = events.find(event => event.id === id).color;
    dispatch(openEventDialog({
      isOpen: true,
      isNew: false,
      id,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      allDay,
      resourceIds,
      color,
    }));
  }
  const handleRangeChange = (range_, view_) => {
    if (isMore.current) {
      isMore.current = false;
      return;
    }
    view.current = view_ ?? view.current;
    if (Array.isArray(range_)) {
      range.current = range_;
    } else {
      const { start, end } = range_;
      range.current = [start, end];
    }
    updateAsync();
  }
  const handleNavigate = (newDate, view_, action) => {
    if (action === "DATE") {
      view.current = Views.DAY;
      range.current = [newDate];
      isMore.current = true;
      updateAsync();
    }
  }
  const eventPropGetter = ({ id }) => ({
    className: "",
    style: view.current === "agenda"
      ? {}
      : { backgroundColor: events.find(event => event.id === id).color }
  });

  return (<>
    <DragAndDropCalendar
      localizer={localizer}
      style={{ height: 700 }}
      views={Object.values(Views)}
      defaultView={view.current}
      step={15}
      min={moment('07:00am', 'h:mma').toDate()}
      max={moment('21:00pm', 'h:mma').toDate()}
      selectable
      resizable
      resources={location.pathname === "/schedules" ? resources : null}
      events={createDisplayEvent(location.pathname, view.current, events)}
      onNavigate={handleNavigate}
      onRangeChange={handleRangeChange}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventResize}
      onSelectSlot={handleSelectSlot}
      onDoubleClickEvent={handleDoubleClickEvent}
      eventPropGetter={eventPropGetter}
      defaultDate={new Date()}
    />
    <EventDialog view={view.current} range={range.current} />
  </>);
}

const createDisplayEvent = (pathname, view, events) => {
  let createDisplayEvent = events
    .filter(event => pathname === "/schedules" || event.resourceId === 1);

  if (['month', 'agenda'].includes(view)) {
    createDisplayEvent = [...new Set(createDisplayEvent
      .map(event => JSON.stringify({
        ...event,
        resourceId: null
      })))]
      .map(event => JSON.parse(event));
  }

  return createDisplayEvent
    .map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));;
}
