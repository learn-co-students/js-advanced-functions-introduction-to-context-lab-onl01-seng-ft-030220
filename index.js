// Your code here
function createEmployeeRecord(employee) {
    return Object.assign({},
        {
            firstName: employee[0],
            familyName: employee[1],
            title: employee[2],
            payPerHour: employee[3],
            timeInEvents: [],
            timeOutEvents: []
        })
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(record,dateTime) {
    record.timeInEvents.push(
        {
            type: "TimeIn",
            date: dateTime.split(" ")[0],
            hour: parseInt(dateTime.split(" ")[1])
        }
    )
    return record
}