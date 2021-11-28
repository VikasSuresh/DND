/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { Todo as Store } from '../../Store';
import { AddEvent } from '../../Components';

const properties = {
    headerToolbar: {
        start: 'dayGridMonth dayGridWeek timeGridDay',
        center: 'title',
        end: 'today prevYear,prev,next,nextYear',
    },
    buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List',
    },
};

const Calendar = observer(() => {
    const {
        headerToolbar, buttonText,
    } = properties;

    const [task, createTask] = useState({
        id: null,
        name: null,
        open: false,
        start: null,
        dueDate: null,
    });

    const handleClose = () => createTask({
        id: null, name: null, start: null, open: false, dueDate: null,
    });
    const handleOpen = (e:any) => createTask((state) => ({
        ...state,
        open: true,
        start: e.start,
        dueDate: e.end,
        ...(e.event ? { id: e.event.id, name: e.event.title } : {}),
    }));

    const updateTask = (e:any) => {
        Store.updateDate({
            _id: e.event.id,
            start: moment(e.event.start).format(),
            dueDate: Store.month ? moment(e.event.end).subtract(1).endOf('d').format() : moment(e.event.end).format(),
        });
    };

    const events = Store.month ? Store.todos.map((todo) => ({
        id: todo._id,
        title: todo.name,
        start: todo.start,
        end: moment(todo.end).add(1, 'd').toISOString(),
        allDay: true,
    })) : Store.todos.map((todo) => ({
        id: todo._id,
        title: todo.name,
        start: todo.start,
        end: todo.end,
        allDay: false,
    }));

    return (
        <>
            <FullCalendar
                viewDidMount={
                    (e) => {
                        if (e.view.type.indexOf('Day') !== -1) {
                            Store.setMonth(false);
                        } else {
                            Store.setMonth(true);
                        }
                    }
                }
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="85vh"
                headerToolbar={headerToolbar}
                buttonText={buttonText}
                navLinks
                views={
                    {
                        dayGridMonth: {
                            dayHeaderFormat: { weekday: 'long' },
                        },
                        dayGridWeek: {
                            dayHeaderFormat: {
                                weekday: 'long',
                                day: 'numeric',
                            },
                        },
                    }
                }
                events={(fetchInfo, successCallback) => {
                    Store.fetchEvents(fetchInfo);
                    successCallback(events);
                }}
                eventTimeFormat={
                    {
                        hour: 'numeric',
                        minute: '2-digit',
                    }
                }
                selectable
                editable
                dayMaxEvents
                eventResizableFromStart
                select={handleOpen}
                eventClick={handleOpen}
                eventDrop={updateTask}
                eventResize={updateTask}
            />
            <AddEvent handleClose={handleClose} task={task} Store={Store} />
        </>
    );
});

export default Calendar;
