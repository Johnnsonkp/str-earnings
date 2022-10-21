import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

let FullCalendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
});

export default FullCalendar;
