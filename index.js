'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var fetch = require('node-fetch');

var GREETING_KEYWORDS = ["hello", "hi", "eh el a5bar", "sup", "what's up"];

var GREETING_RESPONSES = ["sup bro", "hey :D","Hi :D" ,"Hi From Zozo :p" , "3aml eh yastaa"];

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

var prepEndPoint = function (path) {
	var rootURL = 'http://54.200.48.234:8080/';
	return rootURL + path;
}

app.get('/',
	function (req, res) {
		fetch(prepEndPoint(''))
			.then(function (res) {
				return res.text();
			}).then(function (body) {
				res.send(body);
			});
	}
);

app.get('/test',
	function (req, res) {
		res.send("test text");
	}
);


//NOT WORKING
app.get('/test2',
	function (req, res) {
		fetch(prepEndPoint('viewAllBusinesses')).then
			(
			function (resp) {
				//return res.text();
				res.send(resp.json().all);
			}
			);
	}
);



app.get('/test3',
	function (req, res) {
		fetch(prepEndPoint('viewAllBusinesses')).then
			(
			function (res) {
				return res.json();
			}
			).then
			(
			function (json) {
				res.send(json.all);
			}
			);
	}
);


// for Facebook verification
app.get
	(
	'/webhook/',
	function (req, res) {
		if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
			res.send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token')
	}
	)

function sendTextMessage(sender, text) {
	let messageData = { text: text }
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: token },
		method: 'POST',
		json:
		{
			recipient: { id: sender },
			message: messageData,
		}
	}, function (error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

const token = "EAAatUDcBTFwBAOaJiKKHxOHjaczTYYu32BWwiZBOabW7oxcwjgQiKKQt5ngg2bJ9Nt7HPEzGosZBk7ji4kzZBglKuX53gUZA8Sn9kGYpXtDOEfuiSjE37V3QbjoTNVCQ3FPUmbDTzOwHG5gPrgLsWq8XejJF5hXDFOeSBmG2LQZDZD";


function sendGenericMessage(sender) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: messageData,
		}
	}, function (error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}



app.post('/webhook/', function (req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = req.body.entry[0].messaging[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text

			if (GREETING_KEYWORDS.includes(text.toLowerCase())){
				var rand = GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
				sendTextMessage(sender,rand);
			}
			else if (text === 'Generic') {
				sendGenericMessage(sender)
				continue
			}
			else if (text == 'Hi') {
				sendTextMessage(sender, "Bet2ool lel bot hi?? :P");
			}
			sendTextMessage(sender, "Abo Sandy by7awl ygarab we by2ol:  " + text.substring(0, 200) + " :D")
		}
		if (event.postback) {
			//let text = JSON.stringify(event.postback)
			if (event.postback.payload == "First") {
				fetch(prepEndPoint('viewAllBusinesses')).then
					(
					function (res) {
						return res.json();
					}
					).then
					(
					function (json) {
						//res.send(json.all);
						sendTextMessage(sender, "Postback received: " + json.all, token)
					}
					);
			}
			if (event.postback.payload == "Second") {
				fetch(prepEndPoint('viewAllBusinesses')).then
					(
					function (res) {
						return res.json();
					}
					).then
					(
					function (json) {
						sendTextMessage(sender, "Postback received: " + json.all[0].email, token)
					}
					);
			}
			continue
		}
	}
	res.sendStatus(200)
})




// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})
