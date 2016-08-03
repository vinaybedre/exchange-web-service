var httpntlm = require('httpntlm'),
    request = require('request'),
    fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();
var parseString = xml2js.parseString;
var builder = new xml2js.Builder();

var ews = function() {
    that = this;
    that.configObj = {};
    that.config = function(username, password, url, domain) {
        that.configObj.username = username;
        that.configObj.password = password;
        that.configObj.url = url;
        this.configObj.domain = domain;
    };

    this.createTask = function(subject, dueDate) {
        console.log("Function not yet implemented fully");
        return false;
        var contents = fs.readFileSync(__dirname + '/xmlFiles/createTask.xml').toString();
        contents = contents.replace("_SUBJECT_", subject);
        contents = contents.replace("_DUE_DATE_", dueDate);
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
                console.log("Task Created");
            }
        });
    };

    this.sendMail = function(csvTo, subject, body) {
        var contents = fs.readFileSync(__dirname + '/xmlFiles/sendMail.xml').toString();
        contents = contents.replace("_TO_", csvTo);
        contents = contents.replace("_SUBJECT_", subject);
        contents = contents.replace("_BODY_", body);

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
                console.log("Mail Sent");
            }
            // parseString(res.body, function(err, res) {
            //     console.log(res['s:Envelope']['s:Body'][0]['m:CreateItemResponse'][0]);
            // });
        });
    }
}

module.exports = new ews();