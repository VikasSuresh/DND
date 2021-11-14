/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Todo as Store } from '../../Store';

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
    addEvent: () => {
        prompt('hi');
    },
};

const Calendar = observer((props:any) => {
    const {
        headerToolbar, buttonText, addEvent,
    } = properties;
    useEffect(() => {
        Store.fetch(props.path);
    }, []);

    const events = Store.todos.map((todo) => ({
        id: todo._id,
        title: todo.name,
        start: todo.createdAt,
        end: todo.end,
        allDay: false,
    }));

    return (
        <FullCalendar
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
                            weekday: 'long', day: 'numeric',
                        },
                    },
                }
            }
            events={events}
            eventTimeFormat={
                {
                    hour: 'numeric',
                    minute: '2-digit',
                }
            }
            selectable
            eventClick={addEvent}
            select={addEvent}
            dragScroll
        />
    );
});

export default Calendar;
