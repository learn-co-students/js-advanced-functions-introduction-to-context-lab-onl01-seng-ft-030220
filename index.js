function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(aOa){
    return aOa.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(record, string){
    let [date, time] = string.split(" ")
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date 
    })
    return record
}

function createTimeOutEvent(record, string){
    let [date, time] = string.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date 
    })
    return record
}

function hoursWorkedOnDate(record, soughtDate){
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, date){
    let hoursWorked = hoursWorkedOnDate(record, date)
    return record.payPerHour * hoursWorked
}

function allWagesFor(record){
    let datesWorked = record.timeInEvents.map(function(e){
        return e.date
    })
    let allWages = datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0) 
    return allWages
}

function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }