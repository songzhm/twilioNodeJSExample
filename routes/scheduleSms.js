var express = require('express');
var router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = twilio(accountSid, authToken);
cronJob = require('cron').CronJob;

router.use(function (req, res, next) {
    var textJob = new cronJob('* * * * *', function () {
        console.log('sending msg');
        client.messages.create({
            to: '+19095609916',
            from: '+16572423212',
            body: 'Hello'
        }).then(function (message) {
            res.send(message.sid);
        });
    }, null, true, 'America/Los_Angeles');
    next();
});


module.exports = router;

