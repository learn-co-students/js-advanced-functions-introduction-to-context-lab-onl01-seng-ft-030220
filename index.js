// Your code here
function createEmployeeRecord(arr) {
  let returnObject = {};
  returnObject["firstName"] = arr[0];
  returnObject["familyName"] = arr[1];
  returnObject["title"] = arr[2];
  returnObject["payPerHour"] = arr[3];
  returnObject["timeInEvents"] = [];
  returnObject["timeOutEvents"] = [];

  return returnObject;
};

function createEmployeeRecords(arr) {
  return arr.map((a) => (createEmployeeRecord(a)));
};


function createTimeInEvent(employee, dateStamp) {
  employee["timeInEvents"].push({
    type: "TimeIn",
    hour: parseInt(dateStamp.substr(11,13)),
    date: dateStamp.substr(0, 10)
  });

  return employee;
};


function createTimeOutEvent(employee, dateStamp) {
  employee["timeOutEvents"].push({
    type: "TimeOut",
    hour: parseInt(dateStamp.substr(11,13)),
    date: dateStamp.substr(0, 10)
  });

  return employee;
};

function hoursWorkedOnDate(employee, date) {
  let timeInRecord = employee["timeInEvents"].find((e) => (e["date"] == date));
  let timeOutRecord = employee["timeOutEvents"].find((e) => (e["date"] == date));
  return (timeOutRecord.hour - timeInRecord.hour) / 100;
};


function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date);
  return employee.payPerHour * hoursWorked;
};


function allWagesFor(employee) {
  return employee.timeOutEvents.reduce((acc, event) => {
    return acc += wagesEarnedOnDate(employee, event.date)
  },0);
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName == firstName);
};

function calculatePayroll(records) {
  return records.reduce((totalPay, employee) => {
    return totalPay += allWagesFor(employee);
  }, 0);
};
