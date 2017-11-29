var express = require('express');
var router = express.Router();
const twilio = require('twilio');
const MessageResponse = twilio.twiml.MessagingResponse;
var phoneNumbers = require('../src/phoneNumbers');
var request = require('request');
const simsimi_api_key = process.env.SIMSIMI_API_KEY;

/* GET home page. */
router.post('/', function (req, res) {

    // var from_number = req.body.From;
    var msg_body = req.body.Body;
    // var look_up = phoneNumbers.contacts.find(function (d) {
    //     return d.number === from_number;
    // });
    // var from_name;
    // if(look_up){
    //     from_name = look_up.name;
    // }else{
    //     from_name = 'there';
    // }
    // var resp = new MessageResponse();
    // resp.message(`Hi ${from_name}, how are you doing!`);
    // res.writeHead(200, {
    //     'Content-Type':'text/xml'
    // });
    // res.end(resp.toString());

    request(`http://api.simsimi.com/request.p?key=${simsimi_api_key}&lc=en&ft=1.0&text=${msg_body}`
        ,function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            var resp = new MessageResponse();
            resp.message(info.response);
            res.writeHead(200, {
                'Content-Type':'text/xml'
            });
            res.end(resp.toString());

        }
    })
});


module.exports = router;

