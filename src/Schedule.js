import React, { useState, useCallback, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Popover} from 'antd';
import Calendar from '@toast-ui/react-calendar';
import 'antd/dist/antd.css';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const { Option } = Select;


const schedules = [
    {
        calendarId: 1,
        category: "time",
        isVisible: true,
        title: "Study",
        id: "2",
        body: "Test",
        start,
        end,
        isReadOnly: true
    },
    {
        calendarId: 2,
        category: "time",
        isVisible: true,
        title: "Meeting",
        id: "1",
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
        bgColor: "green",
        dragBgColor: "green",
        borderColor: "green"
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
    const [viewIsOpen, setViewIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentScheadule, setCurrentScheadule] = useState([])
    const [currentId, setCurrentId] = useState('');
    const [currentScheaduleId, setCurrentScheaduleId] = useState(0);
    const [form] = Form.useForm();

    const onSubmit = values => {
        console.log(values)

        schedules.push({
            calendarId: schedules.length+1,
            category: "time",
            isVisible: true,
            title: values.Schedule.title,
            id: values.Schedule.type,
            body: values.Schedule.description,
            start: values.Schedule.start,
            end: values.Schedule.end
        })

        const schedule = {
            calendarId: schedules.length+1,
            category: "time",
            isVisible: true,
            title: values.Schedule.title,
            id: values.Schedule.type,
            body: values.Schedule.description,
            start: values.Schedule.start,
            end: values.Schedule.end
        }

        cal.current.calendarInst.createSchedules([schedule]);
        form.resetFields();
        closeModal();
    }

    const onUpdate = values => {
            const update = {
                category: "time",
                isVisible: true,
                title: values.Schedule.title,
                id: values.Schedule.type,
                body: values.Schedule.description,
                start: values.Schedule.start,
                end:  values.Schedule.end
            }
            cal.current.calendarInst.updateSchedule(
                currentId,
                currentScheaduleId,
                update
            )
            setIsEditing(false)
            form.resetFields();
            closeModal();
    }

    const cal = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openView() {
        setViewIsOpen(true);
    }

    function closeView() {
        setViewIsOpen(false);
    }


    const onClickSchedule = useCallback((e) => {
        const { calendarId, id } = e.schedule;
        const el = cal.current.calendarInst.getElement(id, calendarId);
        console.log(e.schedule)
        setCurrentScheadule(e.schedule)
        // openView();
        console.log(e, el.getBoundingClientRect());
    }, [])

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
        setIsEditing(true)
        
        const { schedule } = e;
        setCurrentId(schedule.id)
        setCurrentScheaduleId(schedule.calendarId)
        openModal();

        // const update = {
        //     category: "time",
        //     isVisible: true,
        //     title: "Meeting",
        //     id: "1",
        //     body: "Description",
        //     start: new Date(new Date().setHours(start.getHours() + 2)),
        //     end: new Date(new Date().setHours(start.getHours() + 3))
        // }
        // cal.current.calendarInst.updateSchedule(
        //     schedule.id,
        //     schedule.calendarId,
        //     update
        // );
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
            visible={viewIsOpen}
            onCancel={closeView}
            onClick={closeView}
            footer={[]}>
                {currentScheadule[0]}
            </Modal>
            <Modal
                visible={modalIsOpen}
                onCancel={closeModal}
                onClick={closeModal}
                footer={[]}
            >{ isEditing ? (
                 <Form onFinish={onUpdate} layout="vertical" form={form}>
                            <h3>Edit Task</h3>
                            <Form.Item name={['Schedule', 'name']} label="Employee">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['Schedule', 'title']} label="Title">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['Schedule', 'type']} label="Type">
                               <Select>
                                    <Option value="1">Task</Option>
                                    <Option value="2">Meeting</Option>
                                    <Option value="3">Training</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['Schedule', 'description']} label="Description">
                                <Input />
                            </Form.Item>
                            <Form.Item name={['Schedule', 'start']} label="Start">
                                 <Input type="datetime-local"/>
                            </Form.Item>
                            <Form.Item name={['Schedule', 'end']} label="End">
                                <Input type="datetime-local"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                </Form>):(
                <Form onFinish={onSubmit} layout="vertical" form={form}>
                                                <h3>Add Task</h3>
                <Form.Item name={['Schedule', 'name']} label="Employee">
                    <Input />
                </Form.Item>
                <Form.Item name={['Schedule', 'title']} label="Title">
                    <Input />
                </Form.Item>
                <Form.Item name={['Schedule', 'type']} label="Type">
                   <Select>
                        <Option value="1">Task</Option>
                        <Option value="2">Meeting</Option>
                        <Option value="3">Training</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['Schedule', 'description']} label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name={['Schedule', 'start']} label="Start">
                     <Input type="datetime-local"/>
                </Form.Item>
                <Form.Item name={['Schedule', 'end']} label="End">
                    <Input type="datetime-local"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>)}
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