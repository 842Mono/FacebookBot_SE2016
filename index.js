'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var fetch = require('node-fetch');

var GREETING_KEYWORDS = ["hello ", "hi ", "eh el a5bar", "sup ", "what's up", "hey "];
var EXACT_GREETINGS = ["hello", "hi", "sup", "hey"];
var GREETING_RESPONSES = ["wsup", "hey :D", "Hi :D", "Hi! Pleased to meet you", "Hello and Welcome! :D"];

var GREETING_KEYWORDS2 = ["how r u", "how are u", "how are you", "3amel eh", "eh'l a5bar", "ezzay el se7a", "ezay el se7a" , "ezayak" , "ezayk" , "ezyk"];
var GREETING_RESPONSES2 = ["Fine. Have a wonderful day! :D", "Fine thanks! :D"];

var BORED_KEYWORDS = ["zh2a", "zah2a", "msh ader", "mesh ader", "mesh aader", "msh aader", "energy", "arfa", "araf", "malal", "mallal", "offf" , "bored" , "Offf"];

var CALLING_KEYWORDS = ["yad ", "ya 3am", "yasta " , " yad", "bo2loz", "bo2lozty", "bo2loztchy", "bo2lozy" , "ya zmely" , "b2olak eh" , "b2olk eh"];
var INTRO_KEYWORDS = ["who are u" , "who r u" , "who are you" , "who r you" , "who is this" , "what is your name" , "what is ur name"];

var ESHTA_WORDS = ["eshta" , "esta" , "Eshta" , "e4ta"];
var BYE_WORDS = ["Bye" , "bye"];

var Languages = ["arabic" , "french" , "franko"];

var TestBank = ["test banks" , "testbanks" , "test bnks" , "mangement" , "management" , "question banks" , "mngmnt" , "bank" , "banks"];

var THANKING_WORDS = ["thanks" , "shokran" , "thnx" , "sanko" , "zanko" , "sankyo" , "zankyo" , "merci" , "rbna y5lek" , "thank you"];
var THANKING_RESPONSES = ["Urw ^_^" , "you are welcome ^_^" , "My pleasure ;)" , "Don't mention it ^_^"]; 

var SAD_WORDS = ["sad" , "z3lan" , "angry" , "w7sh" , "w7esh"];
var CALLINGS2 = ["ya ragel" , "bttklm bgad" , "bgad" , "la mt2olsh" , "sure"];

var Lovee = ["love" , "<3"];

var SHATAYEM = ["fuck" , "7omar" , "donkey" , "7ywan"];
var Complements = ["nice" , "cool" , "awesome" , "great" , "ur good" , "danta dma8" , "danta dema8" , "danta dma3'"];

var SUGGEST_WORDS = ["suggest" , "music" , "want sth to do" , "dnt know what to do" , "like what" , "sth else" , "something else"];
var MUSIC_LIST = ["https://soundcloud.com/noha-moheb/kenny-g-instrumental-wedding" ,
				  "https://soundcloud.com/cheko/kenny-g-endless-love" ,
				  "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9vdFHnl89Yk%26t%3D3668s&h=ATNwT265VwUzSYyphpTdzdmpBqjbF9B3MjfELciDvZA2h0FpcraZuA630RCYIlqwF-iHjbS033iTrD5dIVbPi3URYPbENzwPJ7vEbzQtC20LmkxTKhE_rEoWzZgaupuZXknE" ,
   				  "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCnfj6QCGLyA&h=ATNwT265VwUzSYyphpTdzdmpBqjbF9B3MjfELciDvZA2h0FpcraZuA630RCYIlqwF-iHjbS033iTrD5dIVbPi3URYPbENzwPJ7vEbzQtC20LmkxTKhE_rEoWzZgaupuZXknE"]

var EMOJIS = [ ":D" , "😜" ,":)" , ";P" , ":O" , "(y)" , ":P" , "B)", "B-)" , "8)" , "8-)" , "^_^" , ":*" , "O:)" , "😂" , ";)" , "3:)" , "<3"];

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

var prepEndPoint = function (path) {
	var rootURL = 'http://winningeleven.ga:8080/';
	return rootURL + path;
}

var prepLink = function (path) {
	var rootURL = 'http://winningeleven.ga/';
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
		fetch(prepEndPoint('')).then
			(
			function (res) {
				return res.json();
			}
			).then
			(
			function (json) {
				res.send("This is the winningeleven bot server!! :) " + json);
			}
			);
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

/*
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
*/


function directToWebsite(sender) {
	let messageData =
		{
			"attachment":
			{
				"type": "template",
				"payload":
				{
					"template_type": "button",
					"text": "Here you go...",
					"buttons":
					[
						{
							"type": "web_url",
							"url": prepLink(''),
							"title": "Go To Website"
						}
					]
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


function showBusinesses(sender) {
	fetch(prepEndPoint('viewAllBusinesses')).then
		(
		function (res) {
			return res.json();
		}
		).then
		(
		function (json) {
			var arrayOfBusinesses = [];

			for (let x = 0; x < json.all.length; ++x) {
				let business = json.all[x];
				//console.log(business);
				console.log(prepEndPoint('LOGOS/' + business.logo));
				let businessElement =
					{
						"title": business.name,
						"subtitle": business.description,
						"image_url": prepEndPoint('LOGOS/' + business.logo),
						"buttons":
						[
							{
								"type": "web_url",
								"url": prepLink('detailedBusiness/' + business.name), //"https://www.messenger.com",//prepLink('detailedBusiness/' + business.name),
								"title": "View Details"
							},
							{
								"type": "postback",
								"title": "Show My Activities",
								"payload": "sa" + business.name
							}
						],
					};

				arrayOfBusinesses.push(businessElement);
			}
			//console.log(arrayOfBusinesses);
			let messageData =
				{
					"attachment":
					{
						"type": "template",
						"payload":
						{
							"template_type": "generic",
							"elements": arrayOfBusinesses
						}
					}
				}
			request
				(
				{
					url: 'https://graph.facebook.com/v2.6/me/messages',
					qs: { access_token: token },
					method: 'POST',
					json:
					{
						recipient: { id: sender },
						message: messageData,
					}
				},
				function (error, response, body) {
					if (error) {
						console.log('Error sending messages: ', error)
					} else if (response.body.error) {
						console.log('Error: ', response.body.error)
					}
				}
				)

		}
		);
}



/*
function searchActivityType(sender, )
{
	fetch(prepEndPoint('AllActivitiesallbusinesses')).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function(json)
		{
			console.log(json);

			var arrayOfActivities = [];

			for(let x = 0; x < json.all.length; ++x)
			{
				let business = json.all[x];

				console.log(business);

				let businessElement =
				{
					"title": business.name,
					"subtitle": business.description,
					"image_url": prepEndPoint('LOGOS/' + business.logo),
					"buttons":
					[
						{
							"type": "web_url",
							"url": prepLink('detailedBusiness/' + business.name),
							"title": "View Details"
						}
					],
				};

				{
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
				}

				arrayOfBusinesses.push(businessElement);
			}

			console.log(arrayOfBusinesses);

			let messageData =
			{
				"attachment":
				{
					"type": "template",
					"payload":
					{
						"template_type": "generic",
						"elements":arrayOfBusinesses
					}
				}
			}
			request
			(
				{
					url: 'https://graph.facebook.com/v2.6/me/messages',
					qs: { access_token: token },
					method: 'POST',
					json:
					{
						recipient: { id: sender },
						message: messageData,
					}
				},
				function (error, response, body) {
				if (error) {
					console.log('Error sending messages: ', error)
				} else if (response.body.error) {
					console.log('Error: ', response.body.error)
				}
			}
		)

		}
	);
}
*/


function showAllActivities(sender) {
	console.log(prepEndPoint('AllActivitiesallbusinesses'));
	fetch(prepEndPoint('AllActivitiesallbusinesses')).then
		(
		function (res) {
			return res.json();
		}
		).then
		(
		function (json) {
			var arrayOfActivities = [];
			console.log(json);
			for (let x = 0; x < json.activities.length; ++x) {
				let activity = json.activities[x];
				//console.log(business);
				let activityElement =
					{
						"title": activity.name,
						"subtitle": activity.description,
						"image_url": prepEndPoint('Activities/' + activity.logo),
						"buttons":
						[
							{
								"type": "web_url",
								"url": prepLink('DetailedActivity/' + activity.ID), //"https://www.messenger.com",//prepLink('detailedBusiness/' + business.name),
								"title": "View Details"
							}/*,
						{
							"type": "postback",
							"title": "Show details",
							"payload":activity.name
						}*/
						],
					};

				arrayOfActivities.push(activityElement);
			}
			//console.log(arrayOfBusinesses);
			let messageData =
				{
					"attachment":
					{
						"type": "template",
						"payload":
						{
							"template_type": "generic",
							"elements": arrayOfActivities
						}
					}
				}
			request
				(
				{
					url: 'https://graph.facebook.com/v2.6/me/messages',
					qs: { access_token: token },
					method: 'POST',
					json:
					{
						recipient: { id: sender },
						message: messageData,
					}
				},
				function (error, response, body) {
					if (error) {
						console.log('Error sending messages: ', error)
					} else if (response.body.error) {
						console.log('Error: ', response.body.error)
					}
				}
				)

		}
		);
}


app.post
	(
	'/webhook/',
	function (req, res) {
		let messaging_events = req.body.entry[0].messaging
		for (let i = 0; i < messaging_events.length; i++) {
			let event = req.body.entry[0].messaging[i];
			let sender = event.sender.id;
			let gender = event.sender.gender;
			if (event.message && event.message.text) {
				let text = event.message.text.toLowerCase();
					/*if (text === 'Generic')
					{
						sendGenericMessage(sender)
						continue
					}
					else */
					if (text == "show businesses")
					{
						showBusinesses(sender)
						continue
					}
					else if(text == "show activities")
					{
						showAllActivities(sender)
						continue
					}
					else if(text == "show website" || text.indexOf("website") >= 0)
					{
						directToWebsite(sender);
					}
					else if(new RegExp(GREETING_KEYWORDS.join("|")).test(text) || EXACT_GREETINGS.indexOf(text) >= 0)
					{
						sendTextMessage(sender, GREETING_RESPONSES[Math.floor(Math.random()*GREETING_RESPONSES.length)]);
					}
					else if(new RegExp(GREETING_KEYWORDS2.join("|")).test(text))
					{
						sendTextMessage(sender, GREETING_RESPONSES2[Math.floor(Math.random()*GREETING_RESPONSES2.length)]);
					}
					else if(new RegExp(INTRO_KEYWORDS.join("|")).test(text))
					{
						sendTextMessage(sender, "I am Bo2loz , a chat bot made by winning eleven team B) If u want to know more just continue chatting with me ;)");
					}
					else if(new RegExp(SUGGEST_WORDS.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "try listening to this ;) \n" + MUSIC_LIST[Math.floor(Math.random()*MUSIC_LIST.length)]);
					}
					else if (new RegExp(THANKING_WORDS.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, THANKING_RESPONSES[Math.floor(Math.random()*THANKING_RESPONSES.length)]);
					}
					else if(new RegExp(BORED_KEYWORDS.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "Ah cmon life's full of surprizes :D Just take a break and try something different B)");
					}
					else if(new RegExp(SAD_WORDS.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "Ah cmon don't be sad plz :D Just take a break and try listening to some music B)");
					}
					else if(new RegExp(CALLINGS2.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "ah sd2ny xD");
					}
					else if(new RegExp(Lovee.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "<3");
					}
					else if(new RegExp(SHATAYEM.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "watch ur language plz :D");
					}
					else if(new RegExp(Complements.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "7byby teslam ^_^");
					}
					else if (new RegExp(CALLING_KEYWORDS.join("|")).test(text))
					{
						sendTextMessage(sender, "yeah i am here , What do you want?? 😂");
					}
					else if (new RegExp(TestBank.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "here you go, study well ;P \n https://drive.google.com/file/d/0B0b5sZss-XshVnh1aXZqLXZ5TWc/view");
					}
					else if (new RegExp(ESHTA_WORDS.join("|")).test(text))
					{
						sendTextMessage(sender, "Eshta B)");
					}
					else if (new RegExp(Languages.join("|")).test(text.toLowerCase()))
					{
						sendTextMessage(sender, "NO Arabic just English and basic franko till now :D");
					}
					else if (new RegExp(BYE_WORDS.join("|")).test(text))
					{
						sendTextMessage(sender, "Bye , Nice to meet u :D");
					}
					else if(EMOJIS.indexOf(text) > -1)
					{
						sendTextMessage(sender , text);
					}
					else if(text.indexOf(" late") >= 0 || text.indexOf("time") >= 0)
					{
						sendTextMessage(sender, "It's never too late </3 ;)");
					}
					else if(text.indexOf("why") == 0)
					{
						sendTextMessage(sender, "I don't even know the reason of my existence! 😂");
					}
					else if(text.indexOf("who") == 0)
					{
						sendTextMessage(sender, "You tell me who ;P");
					}
					else if(text.indexOf("do you") == 0 || text.indexOf("do u") == 0 || text.indexOf("Do you") == 0 || text.indexOf("Do u") == 0)
					{
						sendTextMessage(sender, "maybe yes maybe no :p");
					}
					else if(text.indexOf("when") == 0)
					{
						sendTextMessage(sender, "Any time you like <3");
					}
					else if(text.indexOf("where") == 0)
					{
						sendTextMessage(sender, "Far far away beyond the stars!!");
					}
					else if(text.indexOf("which") == 0)
					{
						sendTextMessage(sender, "Let's flip a coin... :D 😂");
					}
					else if(text.indexOf("what") == 0)
					{
						sendTextMessage(sender, "I have absolutely no idea X)");
					}
					else if(text.indexOf("?") >= 0)
					{
						sendTextMessage(sender, "You know.. If you really want to find out you can google it! >:} 😂");
					}
					else
					{
						sendTextMessage(sender, "Not yet... \n Available commands:\n Show Businesses,\n Show Activities,\n Show Website");
						continue
					}

			}
			if (event.postback && event.postback.payload) {
				console.log("el event.postback");
				//console.log(event.postback);
				if (event.postback.payload.substring(0, 2) == "sa")
				{
					//sendTextMessage(sender, event.postback.payload);
					var businessName = event.postback.payload.substring(2);
					//console.log(event.postback.payload.substring(2));
					fetch(prepEndPoint('check/' + businessName)).then
					(
						function (res) {
							return res.json();
						}
					).then
					(
						function (json)
						{
							if(json.allActivities && json.allActivities.length > 0)
							{
								var arrayOfActivities = [];

								for (let x = 0; x < json.allActivities.length; ++x)
								{
									let activity = json.allActivities[x];

									//console.log("activityhaya");
									//.log(activity);

									let activityElement =
										{
											"title": activity.name,
											"subtitle": activity.description,
											"image_url": prepEndPoint('Activities/' + activity.logo),
											"buttons":
											[
												{
													"type": "web_url",
													"url": prepLink('DetailedActivity/' + activity.ID),
													"title": "View Details"
												}/*,
													{
														"type": "postback",
														"title": "Postback",
														"payload": "Payload for first element in a generic bubble",
													}*/
											],
										};

									arrayOfActivities.push(activityElement);
								}

								console.log(arrayOfActivities);

								let messageData =
								{
									"attachment":
									{
										"type": "template",
										"payload":
										{
											"template_type": "generic",
											"elements": arrayOfActivities
										}
									}
								}
								request
									(
									{
										url: 'https://graph.facebook.com/v2.6/me/messages',
										qs: { access_token: token },
										method: 'POST',
										json:
										{
											recipient: { id: sender },
											message: messageData,
										}
									},
									function (error, response, body) {
										if (error) {
											console.log('Error sending messages: ', error)
										} else if (response.body.error) {
											console.log('Error: ', response.body.error)
										}
									}
								);
							}
							else
							{
								sendTextMessage(sender, "This Business has no activities to show at the moment </3");
							}

						}
						);
				}




				continue
			}
		}
		res.sendStatus(200)
	}
	);




// Spin up the server
app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'))
})
