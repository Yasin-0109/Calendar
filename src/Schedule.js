import React, { useState, useCallback, useRef } from 'react';
import {useForm} from "react-hook-form"
import Modal from 'react-modal';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const schedules = [
    {
        calendarId: "1",
        category: "time",
        isVisible: true,
        title: "Study",
        id: "1",
        body: "Test",
        start,
        end
    },
    {
        calendarId: "2",
        category: "time",
        isVisible: true,
        title: "Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() + 1)),
        end: new Date(new Date().setHours(start.getHours() + 2))
    }
];


const calendars = [
    {
        id: "1",
        name: "Task",
        color: "white",
        bgColor: "purple",
        dragBgColor: "purple",
        borderColor: "purple"
    },
    {
        id: "2",
        name: "Meeting",
        color: "white",
        bgColor: "blue",
        dragBgColor: "blue",
        borderColor: "blue"
    },
    {
        id: "3",
        name: "Training",
        color: "white",
        bgColor: "green",
        dragBgColor: "green",
        borderColor: "green"
    }
]

const Schedule = () => {
    const [view, setView] = useState('week')
    const [modalIsOpen, setIsOpen] = useState(false);

    const {register, handleSubmit} = useForm()

    const onSubmit = data =>{
        console.log(data)

        schedules.push({
            calendarId: "3",
            category: "time",
            isVisible: true,
            title: data.title,
            id: "3",
            body: data.description,
            start: data.start,
            end: data.end
        })

        const schedule = {
            calendarId: "3",
            category: "time",
            isVisible: true,
            title: data.title,
            id: "3",
            body: data.description,
            start: data.start,
            end: data.end
        }

        cal.current.calendarInst.createSchedules([schedule]);
    }

    const cal = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const onClickSchedule = useCallback((e) => {
        const { calendarId, id } = e.schedule;
        const el = cal.current.calendarInst.getElement(id, calendarId);

        console.log(e, el.getBoundingClientRect());
    }, [])

    const addTask = e =>{
        schedules.push({
            calendarId: "3",
            category: "time",
            isVisible: true,
            title: "title",
            id: "3",
            body: "description",
            start: start,
            end: end
        })

        const schedule = {
            calendarId: "3",
            category: "time",
            isVisible: true,
            title: "title",
            id: "3",
            body: "description",
            start: start,
            end: end
        }

        cal.current.calendarInst.createSchedules([schedule]);

        console.log()
    }

    const onBeforeCreateSchedule = useCallback((scheduleData) => {
        console.log(scheduleData);

        openModal();

        console.log(schedules)

       
    }, []);

    const onBeforeDeleteSchedule = useCallback((res) => {
        console.log(res);

        const { id, calendarId } = res.schedule;

        cal.current.calendarInst.deleteSchedule(id, calendarId);
    }, []);

    const onBeforeUpdateSchedule = useCallback((e) => {
        console.log(e);

        const { schedule, changes } = e;

        cal.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );
    }, []);

    function _getFormattedTime(time) {
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) {
        var html = [];

        if (!isAllDay) {
            html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(" Private");
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(" " + schedule.title);
        }

        return html.join("");
    }

    const templates = {
        time: function (schedule) {
            console.log(schedule);
            return _getTimeTemplate(schedule, false);
        }
    };

    const dailyView = () => {
        setView('day')
    }

    const weeklyView = () => {
        setView('week')
    }

    const monthlyView = () => {
        setView('month')
    }

    const handleClickNextButton = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.next()
    };

    const handleClickPrevButton = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.next()
    };

    return (
        <div className="App">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input ref={register}
                        placeholder="Title"
                        type="text"
                        name="title"
                        required
                    />
                    <input ref={register}
                        placeholder="Description"
                        type="text"
                        name="description"
                        required
                    />
                    <input ref={register}
                        placeholder="Start"
                        type="datetime-local"
                        name="start"
                        required
                    />
                    <input ref={register}
                        placeholder="End"
                        type="datetime-local"
                        name="end"
                        required
                    />
                    <input ref={register}
                        placeholder="First name"
                        type="text"
                        name="firstName"
                        required
                    />
                    <button type="submit">submit</button>
                </form>
            </Modal>
            <h1>Welcome to TOAST Ui Calendar</h1>
            <button onClick={monthlyView}>Month</button>
            <button onClick={weeklyView}>Week</button>
            <button onClick={dailyView}>Day</button>
            <button onClick={handleClickPrevButton}>Prev</button>
            <button onClick={handleClickNextButton}>Next</button>
            <Calendar
                ref={cal}
                height="1000px"
                view={view}
                useCreationPopup={false}
                useDetailPopup={true}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
        </div>
    )
}

export default Schedule