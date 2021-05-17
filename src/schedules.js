const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const schedules = [
    {
        attendees: ["John", "Michael", "Mary"],
        comments: [{author: 'Michael', comment: 'Hello world'},
        {author: 'Mary', comment: 'Whats up'}],
        calendarId: 1,
        category: "time",
        isVisible: true,
        title: "Study",
        id: "Task",
        body: "Test",
        start,
        end,
        isReadOnly: true
    },
    {
        attendees: ["Susan", "Lars"],
        comments: [],
        calendarId: 2,
        category: "time",
        isVisible: true,
        title: "Meeting",
        id: "Meeting",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() + 1)),
        end: new Date(new Date().setHours(start.getHours() + 2)),
        isReadOnly: true
    }
];

export default schedules