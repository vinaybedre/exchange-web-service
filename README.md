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
