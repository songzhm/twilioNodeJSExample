var express = require('express');
var router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = twilio(accountSid, authToken);
var phoneNumbers = require('../src/phoneNumbers');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(phoneNumbers.contacts);

    client.messages.create({
        to: phoneNumbers.contacts[0],
        from: phoneNumbers.twilio_number,
        body: 'Hello'
    }).then(function (message) {
        res.send(message.sid);
    });

});

module.exports = router;
