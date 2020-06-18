// Your code here
let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfRecords) {
    return arrayOfRecords.map(record => createEmployeeRecord(record))
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let clockedIn = employee.timeInEvents.find(e => e.date === date)
    let clockedOut = employee.timeOutEvents.find(e => e.date === date)
    return ((clockedOut.hour - clockedIn.hour) / 100);
}

let wagesEarnedOnDate = function(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour;
}

const allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map((e)=> { return e.date})
    let total = dates.reduce((work, date)=> { return wagesEarnedOnDate(employee, date) + work}, 0)
    return total;
};

const calculatePayroll = (employees) => {
    return employees.reduce((memo, employee) => { return allWagesFor(employee) + memo}, 0);
}

const findEmployeeByFirstName = (arr, firstName) => {
    return arr.find((employee)=> { return employee.firstName === firstName})
}