const createEmployeeRecord = (employeeValues) => {
    return {
      firstName: employeeValues[0],
      familyName: employeeValues[1],
      title: employeeValues[2],
      payPerHour: employeeValues[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  const createEmployeeRecords = (employeeRecords) => {
    return employeeRecords.map((employee) => createEmployeeRecord(employee))
  }
  
  const createTimeInEvent = (employee, timeEvent) => {
    const [date, hour] = timeEvent.split(' ')
    employee.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour)
    })
    return employee
  }
  
  const createTimeOutEvent = (employee, timeEvent) => {
    const [date, hour] = timeEvent.split(' ')
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour)
    })
    return employee
  }
  
  const hoursWorkedOnDate = (employee, date) => {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
    if (!timeInEvent || !timeOutEvent) {
      throw new SyntaxError('TimeEvent missing associated TimeIn/TimeOut Event')
    }
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100
  }
  
  const wagesEarnedOnDate = (employee, date) => {
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
  }
  
  const allWagesFor = (employee) => {
    return employee.timeInEvents.reduce((memo, event) => {
      return memo + wagesEarnedOnDate(employee, event.date)
    }, 0)
  }
  
  const findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(employee => employee.firstName === firstName)
  }
  
  const calculatePayroll = (employees) => {
    return employees.reduce((memo, employee) => {
      return memo + allWagesFor(employee)
    }, 0)
  }