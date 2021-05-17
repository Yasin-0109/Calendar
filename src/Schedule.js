import React, { useState, useCallback, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Divider  } from 'antd';
import schedules from './schedules'
import calendars from './calendars'
import Calendar from '@toast-ui/react-calendar';
import 'antd/dist/antd.css';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const { Option } = Select;

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

        var attendees = []

        attendees.push(values.Schedule.name)

        var calendarId = schedules.length + 1

        schedules.push({
            attendees: ["John", "Michael", "Mary"],
            comments: [],
            calendarId:calendarId,
            category: "time",
            isVisible: true,
            title: values.Schedule.title,
            id: values.Schedule.type,
            body: values.Schedule.description,
            start: values.Schedule.start,
            end: values.Schedule.end,
            isReadOnly: true
        })

        const schedule = {
            attendees,
            calendarId: calendarId,
            category: "time",
            isVisible: true,
            title: values.Schedule.title,
            id: values.Schedule.type,
            body: values.Schedule.description,
            start: values.Schedule.start,
            end: values.Schedule.end,
            isReadOnly: true
        }

        cal.current.calendarInst.createSchedules([schedule]);
        form.resetFields();
        console.log(schedules)
        closeModal();
    }

    const onUpdate = values => {

        var attendees = []

        attendees.push(values.Schedule.name)

        const update = {
            attendees: attendees,
            category: "time",
            isVisible: true,
            title: values.Schedule.title,
            id: values.Schedule.type,
            body: values.Schedule.description,
            start: values.Schedule.start,
            end: values.Schedule.end
        }

        // Filter our datebase for the right value
         
        const filter = schedules.filter(x => x.calendarId === currentScheadule.calendarId)

        // Update values in the database 

        filter.map(d => {
            d.attendees =  attendees 
            d.title = values.Schedule.title
            d.body = values.Schedule.description
            d.start = values.Schedule.start
            d.end = values.Schedule.end
        })

        setCurrentScheadule(update)
        
        cal.current.calendarInst.updateSchedule(
            currentId,
            currentScheaduleId,
            update
        )
        setIsEditing(false)
        form.resetFields();
        closeModal();
    }

    const comment = values => {
        const update = {
            attendees: currentScheadule.attendees,
            comments: [...currentScheadule.comments,{author: "Yasin", comment: values.Schedule.comment}],
            category: "time",
            isVisible: true,
            title: currentScheadule.title,
            id: currentScheadule.id,
            body: currentScheadule.body,
            start: currentScheadule.start,
            end: currentScheadule.end
        }

        const filter = schedules.filter(x => x.calendarId === currentScheadule.calendarId)

        filter.map(d => {
            d.comments = [...currentScheadule.comments,{author: "Yasin", comment: values.Schedule.comment}]
        })

        setCurrentScheadule(update)

        cal.current.calendarInst.updateSchedule(
            currentId,
            currentScheaduleId,
            update
        )
        setIsEditing(false)
        form.resetFields();
    }

    const cal = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setIsEditing(false)
    }

    function openView() {
        setViewIsOpen(true);
    }

    function closeView() {
        setViewIsOpen(false);
        setIsEditing(false)
    }


    const onClickSchedule = useCallback((e) => {
        const { calendarId, id } = e.schedule;
        const el = cal.current.calendarInst.getElement(id, calendarId);

        // filtering current schedule from database

        const currentScheadule = schedules.find(x => x.calendarId === e.schedule.calendarId)

        console.log(currentScheadule)
        setCurrentScheadule(currentScheadule)
        setCurrentId(currentScheadule.id)
        console.log(currentScheadule.title)
        setCurrentScheaduleId(currentScheadule.calendarId)
        openView();
        console.log(currentScheadule);
    }, [currentScheadule])

    const onBeforeCreateSchedule = useCallback((scheduleData) => {
        console.log(scheduleData);

        openModal();

        console.log(schedules)
    }, []);

    const deleteSchedule = () => {
        cal.current.calendarInst.deleteSchedule(currentId, currentScheaduleId);
        const filter = schedules.filter(x => x.calendarId != currentScheaduleId);
        closeView();
    }

    const editSchedule = () => {
        setIsEditing(true)
    }

    const viewSchedule = () => {
        setIsEditing(false)
    }

    const onBeforeUpdateSchedule = useCallback((e) => {
        console.log(e);
        setIsEditing(true)

        const { schedule } = e;
        setCurrentId(schedule.id)
        setCurrentScheaduleId(schedule.calendarId)
        openModal();


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

    const handleClickNextButton = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.next()
    };

    const handleClickPrevButton = () => {
        const calendarInstance = cal.current.getInstance();
        calendarInstance.prev()
    };

    return (
        <div className="App">
            <Modal
                visible={viewIsOpen}
                onCancel={closeView}
                onClick={closeView}
                footer={[
                    <>
                        {isEditing ? (<Button onClick={viewSchedule} type="primary">View</Button>
                        ) : (
                            <Button onClick={editSchedule} type="primary">Edit</Button>
                        )}
                        <Button onClick={deleteSchedule} type="danger">Delete</Button>
                    </>
                ]}>
                {isEditing ? (
                    <Form onFinish={onUpdate} layout="vertical" form={form}>
                        <h3>Edit Task</h3>
                        <Form.Item name={['Schedule', 'name']} label="Employee">
                            <Select mode="multiple">
                                <Option value="John">John</Option>
                                <Option value="Michael">Michael</Option>
                                <Option value="Mary">Mary</Option>
                                <Option value="Susan">Susan</Option>
                                <Option value="Lars">Lars</Option>
                            </Select>
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
                            <Input type="datetime-local" />
                        </Form.Item>
                        <Form.Item name={['Schedule', 'end']} label="End">
                            <Input type="datetime-local" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                        </Form.Item>
                    </Form>) : (
                    <div>
                        <h3>Title: {currentScheadule.title}</h3>
                        <h3>Type: {currentScheadule.id}</h3>
                        <h3>Description: {currentScheadule.body}</h3>
                        <h3>Attendees: </h3>
                        {currentScheadule.attendees && currentScheadule.attendees.map(name => {
                            return <div>{name + ' '}</div>
                        })}
                        <Divider style={{ borderColor: '#7cb305' }} dashed>Comments</Divider>
                        {currentScheadule.comments && currentScheadule.comments.map(item => {
                            return <div>{item.author + ': ' + item.comment}</div>
                        })}
                        <Form onFinish={comment} layout="vertical" form={form}>
                            <Form.Item name={['Schedule', 'comment']} noStyle>
                            <Input style={{width:'90%'}} />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{display:"inline-block", marginTop:25}} type="primary" htmlType="submit">
                                    Send
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
            <Modal
                visible={modalIsOpen}
                onCancel={closeModal}
                onClick={closeModal}
                footer={[]}
            >
                <Form onFinish={onSubmit} layout="vertical" form={form}>
                    <h3>Add Task</h3>
                    <Form.Item name={['Schedule', 'name']} label="Employee">
                        <Select mode="multiple">
                            <Option value="John">John</Option>
                            <Option value="Michael">Michael</Option>
                            <Option value="Mary">Mary</Option>
                            <Option value="Susan">Susan</Option>
                            <Option value="Lars">Lars</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['Schedule', 'title']} label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['Schedule', 'type']} label="Type">
                        <Select>
                            <Option value="Task">Task</Option>
                            <Option value="Meeting">Meeting</Option>
                            <Option value="Training">Training</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['Schedule', 'description']} label="Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['Schedule', 'start']} label="Start">
                        <Input type="datetime-local" />
                    </Form.Item>
                    <Form.Item name={['Schedule', 'end']} label="End">
                        <Input type="datetime-local" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <h1>Welcome to TOAST Ui Calendar</h1>
            <Button style={{marginRight:5}} onClick={() => setView('month')}>Month</Button>
            <Button style={{marginRight:5}} onClick={() => setView('week')}>Week</Button>
            <Button style={{marginRight:5}} onClick={() => setView('day')}>Day</Button>
            <Button style={{marginRight:5}} onClick={handleClickPrevButton}>Prev</Button>
            <Button style={{marginRight:5}} onClick={handleClickNextButton}>Next</Button>
            <Calendar
                ref={cal}
                height="1000px"
                view={view}
                useCreationPopup={false}
                useDetailPopup={false}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
        </div>
    )
}

export default Schedule