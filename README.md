# exchange-web-service
Exchange Web Service APIs for NodeJS

API for nodejs users. Helps to perform various operations using EWS APIs

## Example

### Sending Mail (sendMail) 

```javascript
var ews = require("exchange-web-service");
ews.config('username', 'password', 'https://mail.example.com/Ews/Exchange.asmx', 'domain');
ews.sendMail('email@example.com', 'MySubject', 'My Body Text');
```

### Creating Task (createTask)
```javascript
var ews = require("exchange-web-service");
ews.config('username', 'password', 'https://mail.example.com/Ews/Exchange.asmx', 'domain');
//ews.createTask('task title', '<due date and time in format:2016-10-26T21:32:52>');
ews.createTask('My Task Title', '2016-10-26T21:32:52');
```

### Creating Appointment (createAppointment)
```javascript
var ews = require("exchange-web-service");
ews.config('username', 'password', 'https://mail.example.com/Ews/Exchange.asmx', 'domain');
// ews.createAppointment('Subject of Appointment', 'Body of appointment', 'Start date in UTC eg.2016-08-03T21:32:52Z', 'End date in UTC eg.2016-08-03T22:32:52Z', ews.constants.CalendarBusyStatus.<Free|Tentative|Busy|OutOfOffice|NoStatus|WorkingElsewhere>, 'Location of appointment');
ews.createAppointment('Meet a colleague', 'Meet Paul', '2016-08-03T21:32:52Z', '2016-08-03T22:32:52Z', ews.constants.CalendarBusyStatus.OutOfOffice, 'Coffee Corner');
```
>Possible values for BusyStatus would be 
>*Free
>*Tentative
>*Busy
>*OutOfOffice
>*NoStatus
>*WorkingElsewhere

>As of now the reminder will be set automatically before 15 minutes of any appointment