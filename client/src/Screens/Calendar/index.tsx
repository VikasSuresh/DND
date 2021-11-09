import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => (
    <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="85vh"
    />
);

export default Calendar;
