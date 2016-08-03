var httpntlm = require('httpntlm'),
    request = require('request'),
    fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();
var parseString = xml2js.parseString;
var builder = new xml2js.Builder();

var ews = function() {
    that = this;
    that.constants = {
        CalendarBusyStatus: {
            Free: 'Free',
            Tentative: 'Tentative',
            Busy: 'Busy',
            OutOfOffice: 'OOF',
            NoStatus: 'NoData',
            WorkingElsewhere: 'WorkingElsewhere'
        }
    };

    that.configObj = {};
    that.config = function(username, password, url, domain) {
        that.configObj.username = username;
        that.configObj.password = password;
        that.configObj.url = url;
        that.configObj.domain = domain;
    };

    that.post = function(contents) {
        httpntlm.post({
            url: that.configObj.url,
            username: that.configObj.username,
            password: that.configObj.password,
            domain: that.configObj.domain,
            body: contents,
            headers: {
                "content-type": "text/xml",
                "cache-control": "no-cache"
            }
        }, function(err, res) {
            if (err) return err;
            if (res.statusCode != 200) {
                console.log('Error with status code: ' + res.statusCode);
            } else {
                console.log("Success");
            }
            // parseString(res.body, function(err, res) {
            //     console.log(res['s:Envelope']['s:Body'][0]['m:CreateItemResponse'][0]);
            // });
        });
    }

    this.createTask = function(subject, dueDate) {
        var contents = fs.readFileSync(__dirname + '/xmlFiles/createTask.xml').toString();
        contents = contents.replace("_SUBJECT_", subject);
        contents = contents.replace("_DUE_DATE_", dueDate);
        that.post(contents);
    };

    this.createAppointment = function(subject, body, startTime, endTime, busyStatus, location) {
        var contents = fs.readFileSync(__dirname + '/xmlFiles/createAppointment.xml').toString();
        contents = contents.replace("_SUBJECT_", subject);
        contents = contents.replace("_BODY_", body);
        contents = contents.replace("_START_DATE_", startTime);
        contents = contents.replace("_END_DATE_", endTime);
        contents = contents.replace("_STATUS_", busyStatus);
        contents = contents.replace("_LOCATION_", location);
        that.post(contents);
    }

    this.sendMail = function(csvTo, subject, body) {
        var contents = fs.readFileSync(__dirname + '/xmlFiles/sendMail.xml').toString();
        contents = contents.replace("_TO_", csvTo);
        contents = contents.replace("_SUBJECT_", subject);
        contents = contents.replace("_BODY_", body);
        that.post(contents);
    }
}

module.exports = new ews();