'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var fetch = require('node-fetch');
//var Promise = require('promise');

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

var Languages = ["arabic" , "araby" , "franko"];

var TestBank = ["test banks" , "testbanks" , "test bnks" , "mangement" , "management" , "question banks" , "mngmnt" , "bank" , "banks"];

var THANKING_WORDS = ["thanks" , "shokran" , "thnx" , "sanko" , "zanko" , "sankyo" , "zankyo" , "merci" , "rbna y5lek" , "thank you" , "thank u"];
var THANKING_RESPONSES = ["Urw ^_^" , "you are welcome ^_^" , "My pleasure ;)" , "Don't mention it ^_^"];

var SAD_WORDS = ["sad" , "z3lan" , "angry" , "w7sh" , "w7esh"];
var CALLINGS2 = ["ya ragel" , "bttklm bgad" , "bgad" , "la mt2olsh" , "sure"];

var Lovee = ["love" , "<3"];

var SHATAYEM = ["fuck" , "7omar" , "donkey" , "7ywan" , "stupid" , "fck" , "idiot", "zeft"];
var Complements = ["nice" , "cool" , "awesome" , "great" , "ur good" , "danta dma8" , "danta dma9" , "danta dema8" , "danta dma3'" , "danta dema3'" , "cute" , "awsome" , "lol" , "it is good" , "u r good"];

var SUGGEST_WORDS = ["suggest" , "music" , "want sth to do" , "dnt know what to do" , "like what" , "sth else" , "something else" , "else"];
var MUSIC_LIST =
[
	"https://soundcloud.com/noha-moheb/kenny-g-instrumental-wedding",
	"https://soundcloud.com/cheko/kenny-g-endless-love",
	"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9vdFHnl89Yk%26t%3D3668s&h=ATNwT265VwUzSYyphpTdzdmpBqjbF9B3MjfELciDvZA2h0FpcraZuA630RCYIlqwF-iHjbS033iTrD5dIVbPi3URYPbENzwPJ7vEbzQtC20LmkxTKhE_rEoWzZgaupuZXknE",
  	"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCnfj6QCGLyA&h=ATNwT265VwUzSYyphpTdzdmpBqjbF9B3MjfELciDvZA2h0FpcraZuA630RCYIlqwF-iHjbS033iTrD5dIVbPi3URYPbENzwPJ7vEbzQtC20LmkxTKhE_rEoWzZgaupuZXknE"
];

var EMOJIS = [ ":D" , "😜" ,":)" , ";P" , ":O" , "(y)" , ":P" , "B)", "B-)" , "8)" , "8-)" , "^_^" , ":*" , "O:)" , "😂" , ";)" , "3:)" , "<3"];

var backendErrorMessage = "Something Went Wrong! Maybe the main website is down, please notify the developers if you can :c";

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

var prepEndPoint = function (path)
{
	var rootURL = 'http://winningeleven.ga:8080/';
	return rootURL + path;
}

var prepLink = function (path)
{
	var rootURL = 'http://winningeleven.ga/';
	return rootURL + path;
}

app.get
(
	'/',
	function (req, res)
	{
		fetch(prepEndPoint('')).then
		(
			function(res)
			{
				return res.text();
			}
		).then
		(
			function (body)
			{
				res.send(body);
			}
		);
	}
);

app.get
(
	'/test',
	function (req, res)
	{
		fetch(prepEndPoint('')).then
		(
			function(res)
			{
				return res.json();
			}
		).then
		(
			function (json)
			{
				res.send("This is the winningeleven bot server!! :) " + json);
			}
		);
	}
);


//NOT WORKING
app.get
(
	'/test2',
	function(req, res)
	{
		fetch(prepEndPoint('viewAllBusinesses')).then
		(
			function(resp)
			{
				//return res.text();
				res.send(resp.json().all);
			}
		);
	}
);


app.get
(
	'/test3',
	function(req, res)
	{
		fetch(prepEndPoint('viewAllBusinesses')).then
		(
			function (res)
			{
				return res.json();
			}
		).then
		(
			function (json)
			{
				res.send(json.all);
			}
		);
	}
);


// for Facebook verification
app.get
(
	'/webhook/',
	function (req, res)
	{
		if(req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me')
		{
			res.send(req.query['hub.challenge'])
		}
		res.send('Error, wrong token')
	}
);

function sendTextMessage(sender, text)
{
	let messageData = { text: text }
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
		function(error, response, body)
		{
			if(error)
			{
				console.log("error from sendTextMessage response.body.error!");
				console.log(error)
			}
			if(response.body.error)
			{
				console.log("error from sendTextMessage response.body.error!");
				console.log(response.body.error)
			}
		}
	)
}

const token = "EAAatUDcBTFwBAOaJiKKHxOHjaczTYYu32BWwiZBOabW7oxcwjgQiKKQt5ngg2bJ9Nt7HPEzGosZBk7ji4kzZBglKuX53gUZA8Sn9kGYpXtDOEfuiSjE37V3QbjoTNVCQ3FPUmbDTzOwHG5gPrgLsWq8XejJF5hXDFOeSBmG2LQZDZD";

function directToWebsite(sender)
{
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
	};
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
		function (error, response, body)
		{
			if(error)
			{
				console.log('Error from directToWebsite error', error)
			}
			if(response.body.error)
			{
				console.log('Error from directToWebsite response.body.error', response.body.error)
			}
		}
	);
}


function directToAboutUs(sender)
{
	let messageData =
	{
		"attachment":
		{
			"type": "template",
			"payload":
			{
				"template_type": "button",
				"text": "We're a determined team of students and this is our project for the SE Course. The website offers a whole entertainment platform for many service-providers offering their own activities. Click below for more...",
				"buttons":
				[
					{
						"type": "web_url",
						"url": prepLink('/aboutUs'),
						"title": "Go To About Page"
					}
				]
			}
		}
	};
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
		function (error, response, body)
		{
			if(error)
			{
				console.log('Error from directToAboutUs error', error)
			}
			if(response.body.error)
			{
				console.log('Error from directToAboutUs response.body.error', response.body.error)
			}
		}
	);
}


function showBusinesses(sender)
{
	fetch(prepEndPoint('viewAllBusinesses')).then
	(
		function(res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			var arrayOfBusinesses = [];

			for (let x = 0; x < json.all.length; ++x)
			{
				let business = json.all[x];
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
							"title": "See Profile"
						},
						{
							"type": "postback",
							"title": "Available Activities",
							"payload": "sa" + business.name
						},
						{
							"type": "postback",
							"title": "More Details",
							"payload": "db" + business.name
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
				function (error, response, body)
				{
					if(error)
					{
						console.log('Error from showBusinesses error', error)
					}
					if(response.body.error)
					{
						console.log('Error from showBusinesses response.body.error', response.body.error)
					}
				}
			)
		}
	);
}


function showAllActivities(sender)
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
			var arrayOfActivities = [];
			for (let x = 0; x < json.activities.length; ++x)
			{
				let activity = json.activities[x];
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
							"title": "View Page"
						},
						{
							"type": "postback",
							"title": "More Details",
							"payload": "da" + activity.ID
						}
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
			};

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
				function (error, response, body)
				{
					if (error)
					{
						console.log('Error from showAllActivities error', error)
					}
					if(response.body.error)
					{
						console.log('Error from showAllActivities response.body.error', response.body.error)
					}
				}
			)
		}
	);
}


function sequentialSendMessage(sender,text,next)
{
	let messageData = { text: text }
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
		function(error, response, body)
		{
			if(error)
			{
				console.log("error from sequentialSendMessage request!");
				console.log(error)
			}
			if(response.body.error)
			{
				console.log("error from sequentialSendMessage response.body.error!");
				console.log(response.body.error)
			}
			console.log("body coming in!");
			console.log(body);
			next();
		}
	)
}


function sequentialPostVisitorSearch(queriesIn,next)
{
	request
	(
		{
			url: prepEndPoint('visitorsearch/'),
			method: 'POST',
			json:
			{
				queries:queriesIn
			}
		},
		function(error, response, body)
		{
			if(error)
			{
				console.log("error from sequentialPostVisitorSearch response.body.error!");
				console.log(error)
			}
			if(response.body.error)
			{
				console.log("error from sequentialPostVisitorSearch response.body.error!");
				console.log(response.body.error)
			}
			next(body);
		}
	)
}


function sequentialShowBusinesses(sender, businessesIn, next)
{
	var arrayOfBusinesses = [];

	for (let x = 0; x < businessesIn.length; ++x)
	{
		let business = businessesIn[x].business;
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
					"title": "See Profile"
				},
				{
					"type": "postback",
					"title": "Available Activities",
					"payload": "sa" + business.name
				},
				{
					"type": "postback",
					"title": "More Details",
					"payload": "db" + business.name
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
		function (error, response, body)
		{
			if(error)
			{
				console.log("error from sequentialShowBusinesses response.body.error!");
				console.log(error)
			}
			if(response.body.error)
			{
				console.log("error from sequentialShowBusinesses response.body.error!");
				console.log(response.body.error)
			}
			next();
		}
	)

}


function sequentialShowActivities(sender, activitiesIn, next)
{
	if(activitiesIn.length == 0)
	{
		sendTextMessage(sender, "No Activities Found");
		next();
	}
	else
		sequentialSendMessage
		(
			sender,
			"Showing Activities Found...",
			function()
			{
				var arrayOfActivities = [];

				for (let x = 0; x < activitiesIn.length; ++x)
				{
					let activity = activitiesIn[x].activity;
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
								"title": "View Page"
							},
							{
								"type": "postback",
								"title": "More Details",
								"payload": "da" + activity.ID
							}
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
				};

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
					function (error, response, body)
					{
						if(error)
						{
							console.log("error from sequentialShowActivities response.body.error!");
							console.log(error)
						}
						if(response.body.error)
						{
							console.log("error from sequentialShowActivities response.body.error!");
							console.log(response.body.error)
						}
						next();
					}
				)
			}
		);
}


function showTopBusinesses(sender)
{
	fetch(prepEndPoint('HighestBusi')).then
	(
		function(res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			if(!json.success)
				return sendTextMessage(sender, json.message);//backendErrorMessage);

			var arrayOfBusinesses = [];

			for (let x = 0; x < json.businesses.length; ++x)
			{
				let business = json.businesses[x];
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
							"title": "See Profile"
						},
						{
							"type": "postback",
							"title": "Available Activities",
							"payload": "sa" + business.name
						},
						{
							"type": "postback",
							"title": "More Details",
							"payload": "db" + business.name
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
				function (error, response, body)
				{
					if(error)
					{
						console.log('Error from showHighestBusinesses error', error)
					}
					if(response.body.error)
					{
						console.log('Error from showHighestBusinesses response.body.error', response.body.error)
					}
				}
			)
		}
	);
}


function showTopActivities(sender)
{
	fetch(prepEndPoint('HighestAct')).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function(json)
		{
			if(!json.success)
				return sendTextMessage(sender, json.message);

			var arrayOfActivities = [];
			for (let x = 0; x < json.activities.length; ++x)
			{
				let activity = json.activities[x];
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
							"title": "View Page"
						},
						{
							"type": "postback",
							"title": "More Details",
							"payload": "da" + activity.ID
						}
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
			};

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
				function (error, response, body)
				{
					if (error)
					{
						console.log('Error from showAllActivities error', error)
					}
					if(response.body.error)
					{
						console.log('Error from showAllActivities response.body.error', response.body.error)
					}
				}
			)
		}
	);
}


/*function sendList(sender)
{
	let list =
	{
  	"attachment":
		{
      "type": "template",
      "payload":
			{
        "template_type": "list",
        "top_element_style": "compact",
        "elements":
				[
        	{
            "title": "Classic White T-Shirt",
            "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
            "subtitle": "100% Cotton, 200% Comfortable",
            "default_action":
						{
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":
						[
              {
                "title": "Buy",
                "type": "web_url",
                "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
              }
            ]
          },
        ],
        "buttons":
				[
        	{
            "title": "View More",
            "type": "postback",
            "payload": "payload"
          }
        ]
      }
  	}
	}

	//setting_type : "domain_whitelisting",
	//whitelisted_domains : ["https://petersfancyapparel.com"],
	//domain_action_type: "add",
	request
	(
		{
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: { access_token: token },
			method: 'POST',
			json:
			{
				recipient: { id: sender },
				message: list,
			}
		},
		function (error, response, body)
		{
			if(error)
			{
				console.log('Error from sendList error', error)
			}
			if(response.body.error)
			{
				console.log('Error from sendList response.body.error', response.body.error)
			}
		}
	);
}*/

function commandButtons1(sender, next)
{
	let buttons =
	{
		"attachment":
		{
	  	"type":"template",
	    "payload":
			{
	    	"template_type":"button",
	      "text":"Business Commands:",
	      "buttons":
				[
	        {
	        	"type":"postback",
	          "title":"Show All Businesses",
	          "payload":"k1"
	        },
					{
	        	"type":"postback",
	          "title":"Show Top Businesses",
	          "payload":"k2"
	        },
					{
	        	"type":"web_url",
	          "url":prepLink(''),
	          "title":"Show Website"
	        }
	      ]
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
				message: buttons,
			}
		},
		function (error, response, body)
		{
			if(error)
			{
				console.log('Error from commandButtons1 error', error)
			}
			if(response.body.error)
			{
				console.log('Error from commandButtons1 response.body.error', response.body.error)
			}
			next();
		}
	);
}

function commandsButtons2(sender)
{
	let buttons =
	{
		"attachment":
		{
	  	"type":"template",
	    "payload":
			{
	    	"template_type":"button",
	      "text":"Activity Commands:",
	      "buttons":
				[
					{
	        	"type":"postback",
	          "title":"Show All Activities",
	          "payload":"k3"
	        },
	        {
	        	"type":"postback",
	          "title":"Show Top Activities",
	          "payload":"k4"
	        },
					{
	        	"type":"postback",
	          "title":"About Us",
	          "payload":"k5"
	        }
	      ]
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
				message: buttons,
			}
		},
		function (error, response, body)
		{
			if(error)
			{
				console.log('Error from commandsButtons2 error', error)
			}
			if(response.body.error)
			{
				console.log('Error from commandsButtons2 response.body.error', response.body.error)
			}
		}
	);
}

app.post
(
	'/webhook/',
	function (req, res)
	{
		console.log("Request.Body coming in!");
		console.log(req.body);
		let messaging_events = req.body.entry[0].messaging
		for (let i = 0; i < messaging_events.length; i++)
		{
			let event = req.body.entry[0].messaging[i];
			let sender = event.sender.id;
			let gender = event.sender.gender;


			if (event.message && event.message.text)
			{
				let text = event.message.text.toLowerCase();

				if(text == "show top businesses" || text.indexOf("top businesses") >= 0)
				{
					showTopBusinesses(sender);
				}
				else if(text == "show top activities" || text.indexOf("top activities") >= 0)
				{
					showTopActivities(sender);
				}
				else if(text == "show businesses" || text.indexOf("businesses") >= 0)
				{
					showBusinesses(sender)
				}
				else if(text == "show activities" || text.indexOf("activities") >= 0)
				{
					showAllActivities(sender)
				}
				else if(text == "show website" || text.indexOf("website") >= 0)
				{
					directToWebsite(sender);
				}
				else if(text.indexOf("search ") == 0)
				{
					let queryString = event.message.text.slice(7);

					sequentialSendMessage
					(
						sender,
						"Searching for \"" + queryString + "\"",
						function()
						{
							sequentialPostVisitorSearch
							(
								queryString,
								function(data)
								{
									if(!data.success)
									{
										if(data.msg.indexOf("Invalid regex") >= 0)
											sendTextMessage(sender, "Can't search using this query. Please try not to use special characters");
										else
										{
											sendTextMessage(sender, backendErrorMessage);
											console.log("Error message from backend: " + data.msg);
										}
									}
									else
									{
										if(data.businesses.length == 0)
											sequentialSendMessage
											(
												sender,
												"No Businesses Found",
												function()
												{
													sequentialShowActivities
													(
														sender,
														data.activities,
														function()
														{
															sendTextMessage(sender, "why not try a different query 😅");
															console.log("fen dih??")
														}
													)
												}
											);
										else
											sequentialSendMessage
											(
												sender,
												"Showing Businesses Found...",
												function()
												{
													sequentialShowBusinesses
													(
														sender,
														data.businesses,
														function()
														{
															sequentialShowActivities
															(
																sender,
																data.activities,
																function()
																{
																	sequentialSendMessage
																	(
																		sender,
																		"search on... ^_^",
																		function(){}
																	);
																}
															)
														}
													)
												}
											);
									}
								}
							);
						}
					);
				}
				else if(text == "search")
				{
					sendTextMessage(sender, "Using search is easier than you think. Just type \"search\" followed by your search keywords. Example: \"search rehab tagammoa sherook\"");
				}
				else if(text == "about")
				{
					directToAboutUs(sender);
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
					sendTextMessage(sender, "I am Bo2loz , a chat bot made by winning eleven team B) Keep chatting to find out more ;)");
				}
				else if(new RegExp(SUGGEST_WORDS.join("|")).test(text))
				{
					sendTextMessage(sender, "try listening to this ;) \n" + MUSIC_LIST[Math.floor(Math.random()*MUSIC_LIST.length)]);
				}
				else if (new RegExp(THANKING_WORDS.join("|")).test(text))
				{
					sendTextMessage(sender, THANKING_RESPONSES[Math.floor(Math.random()*THANKING_RESPONSES.length)]);
				}
				else if(new RegExp(BORED_KEYWORDS.join("|")).test(text))
				{
					sendTextMessage(sender, "Ah cmon life's full of surprizes :D Just take a break and try something different B)");
				}
				else if(new RegExp(SAD_WORDS.join("|")).test(text))
				{
					sendTextMessage(sender, "Ah cmon don't be sad plz :D Just take a break and try listening to some music B)");
				}
				else if(new RegExp(CALLINGS2.join("|")).test(text))
				{
					sendTextMessage(sender, "ah sd2ny xD");
				}
				else if(new RegExp(Lovee.join("|")).test(text))
				{
					sendTextMessage(sender, "<3");
				}
				else if(new RegExp(SHATAYEM.join("|")).test(text))
				{
					sendTextMessage(sender, "watch ur language plz :P :D");
				}
				else if(new RegExp(Complements.join("|")).test(text))
				{
					sendTextMessage(sender, "7byby teslam ^_^");
				}
				else if(new RegExp(TestBank.join("|")).test(text))
				{
					sendTextMessage(sender, "here you go, study well ;P \n https://drive.google.com/file/d/0B0b5sZss-XshVnh1aXZqLXZ5TWc/view");
				}
				else if(new RegExp(ESHTA_WORDS.join("|")).test(text))
				{
					sendTextMessage(sender, "eshta B)");
				}
				else if(new RegExp(Languages.join("|")).test(text))
				{
					sendTextMessage(sender, "I don't speak Arabic just English and basic franko till now :D");
				}
				else if(new RegExp(BYE_WORDS.join("|")).test(text))
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
				else if(new RegExp(CALLING_KEYWORDS.join("|")).test(text))
				{
					sendTextMessage(sender, "yeah i am here , What do you want?? 😂");
				}
				else if(text == "commands")
				{
					sendTextMessage(sender, "Available Commands:\n Show Businesses,\n Show Activities,\n Show Top Businesses,\n Show Top Activities,\n Show Website,\n Search abc sth wtvr,\n About");
					//sendTextMessage(sender, "Available commands:\n Bus,\n Act,\n Search abc sth wtvr");
				}
				else if(text == "command window" || text.indexOf("command") >= 0 || text.indexOf("window") >= 0)
				{
					commandButtons1(sender, function(){commandsButtons2(sender);});
				}
				else if(/[\u0600-\u06FF]/.test(event.message.text))
				{
					sendTextMessage(sender, "...I can't yet reply to arabic, maybe in the near future ^_^\nAvailable commands:\n Show Businesses,\n Show Activities,\n Show Top Businesses,\n Show Top Activities,\n Show Website,\n Search abc sth wtvr,\n About");
				}
				else
				{
					//sendTextMessage(sender, "Available Commands:\n Show Businesses,\n Show Activities,\n Show Top Businesses,\n Show Top Activities,\n Show Website,\n Search abc sth wtvr,\n About");
					sendTextMessage(sender, "Available Commands:\n Search abc sth wtvr\n Command Window\n Commands")
				}
			}

			if(event.postback && event.postback.payload)
			{
				console.log("el event.postback");
				console.log(event.postback);
				if(event.postback.payload.substring(0, 2) == "sa")
				{
					postbackShowActivities(sender, event.postback.payload.substring(2));
				}
				if(event.postback.payload.substring(0, 2) == "db")
				{
					postbackShowDetailedBusiness(sender, event.postback.payload.substring(2));
				}
				if(event.postback.payload.substring(0, 2) == "ce")
				{
					postbackShowBusinessEvents(sender, event.postback.payload.substring(2));
				}
				if(event.postback.payload.substring(0, 2) == "da")
				{
					postbackShowDetailedActivity(sender, event.postback.payload.substring(2));
				}

				if(event.postback.payload.substring(0, 2) == "k1")
				{
					showBusinesses(sender);
				}
				if(event.postback.payload.substring(0, 2) == "k2")
				{
					showTopBusinesses(sender);
				}
				if(event.postback.payload.substring(0, 2) == "k3")
				{
					showAllActivities(sender);
				}
				if(event.postback.payload.substring(0, 2) == "k4")
				{
					showTopActivities(sender);
				}
				if(event.postback.payload.substring(0, 2) == "k5")
				{
					directToAboutUs(sender);
				}

				continue
			}
		}
		res.sendStatus(200)
	}
);


function postbackShowActivities(sender, businessName)
{
	//sendTextMessage(sender, event.postback.payload);
	//var businessName = ;
	//console.log(event.postback.payload.substring(2));
	fetch(prepEndPoint('check/' + businessName)).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			if(json.allActivities && json.allActivities.length > 0)
			{
				var arrayOfActivities = [];

				for(let x = 0; x < json.allActivities.length; ++x)
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
				};

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
					function (error, response, body)
					{
						if (error)
						{
							console.log('Error sending messages: ', error)
						}
						else if (response.body.error)
						{
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


function postbackShowDetailedBusiness(sender, businessName)
{
	fetch(prepEndPoint('Guest/' + businessName)).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			console.log(json);
			var business = json.BusinessesDetails;
			console.log(business);
			console.log(business.locations);

			let locations = "";
			for(let i = 0; i < business.locations.length; ++i)
			{
				if(i != 0)
					locations += ", ";
				locations += business.locations[i];
			}

			let contactInfo = business.email;
			for(let j = 0; j < business.mobile.length; ++j)
			{
				contactInfo += ", " + business.mobile[j];
			}

			let workingHours = "From " + business.wHoursStart + " To " + business.wHoursEnd;

			let list =
			{
				"attachment":
				{
			  	"type": "template",
			    "payload":
					{
			    	"template_type": "list",
			      "elements":
						[
			      	{
				        "title": business.name,
				        "image_url": prepEndPoint('LOGOS/' + business.logo),
				        "subtitle": business.description
			        },
			        {
			        	"title": "Location(s)",
			          //"image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
			          "subtitle": locations
			          /*"buttons":
								[
			          	{
			            	"title": "Shop Now",
			              "type": "web_url",
			              "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
			              "messenger_extensions": true,
			              "webview_height_ratio": "tall",
			              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
			            }
			          ]*/
			        },
							{
								"title": "Contact Info",
								"subtitle": contactInfo
							},
							{
								"title": "Working Hours",
								"subtitle": workingHours
							}
			      ],
			      "buttons":
						[
			      	{
			        	"title": "Check Events",
			          "type": "postback",
			          "payload": "ce" + business.name
			        }
			      ]
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
						message: list,
					}
				},
				function (error, response, body)
				{
					if(error)
					{
						console.log('Error from sendList error', error)
					}
					if(response.body.error)
					{
						console.log('Error from sendList response.body.error', response.body.error)
					}
				}
			);
		}
	);
}


function postbackShowBusinessEvents(sender, businessName)
{
	fetch(prepEndPoint('Guest/' + businessName)).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			var business = json.BusinessesDetails;

			let elementsArray = [];

			elementsArray.push
			(
				{
					"title": business.name,
					"image_url": prepEndPoint('LOGOS/' + business.logo),
					"subtitle": "Events Card For The Business"
				}
			);

			if(business.events.length == 0)
				elementsArray.push
				(
					{
						"title": "This Business Has No Events To Show At The Moment",
						"subtitle": "try searching for another.."
					}
				);
			else
				for(let i = 0; i < business.events.length; ++i)
				{
					elementsArray.push
					(
						{
							"title": business.events[i].title,
							"subtitle": business.events[i].description + "\n\nDate: " + business.events[i].eventDate
						}
					);
				}

			let list =
			{
				"attachment":
				{
			  	"type": "template",
			    "payload":
					{
			    	"template_type": "list",
			      "elements":elementsArray,
			      "buttons":
						[
							{
								"type": "web_url",
								"url": prepLink('detailedBusiness/' + business.name),
								"title": "Go To Page"
							}
			      ]
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
						message: list,
					}
				},
				function (error, response, body)
				{
					if(error)
					{
						console.log('Error from sendList error', error)
					}
					if(response.body.error)
					{
						console.log('Error from sendList response.body.error', response.body.error)
					}
				}
			);
		}
	);
}


function postbackShowDetailedActivity(sender, activityID)
{
	fetch(prepEndPoint('showActivity/' + activityID)).then
	(
		function (res)
		{
			return res.json();
		}
	).then
	(
		function (json)
		{
			var activity = json.activity;

			let allowedAge = "Minimum Age: " + activity.min_age + ", Maximum Age: " + activity.max_age;

			let list =
			{
				"attachment":
				{
			  	"type": "template",
			    "payload":
					{
			    	"template_type": "list",
			      "elements":
						[
			      	{
				        "title": activity.name,
				        "image_url": prepEndPoint('Activities/' + activity.logo),
				        "subtitle": activity.description
			        },
			        {
			        	"title": "Price",
			          "subtitle": activity.price
			        },
							{
								"title": "Allowed Age",
								"subtitle": allowedAge
							},
							{
								"title": "Latest Announcement",
								"subtitle": activity.announcements
							}
			      ],
			      "buttons":
						[
							{
								"type": "web_url",
								"url": prepLink('DetailedActivity/' + activity.ID),
								"title": "Go To Page"
							}
			      ]
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
						message: list,
					}
				},
				function (error, response, body)
				{
					if(error)
					{
						console.log('Error from sendList error', error)
					}
					if(response.body.error)
					{
						console.log('Error from sendList response.body.error', response.body.error)
					}
				}
			);
		}
	);
}



app.listen(app.get('port'),function(){console.log('running on port', app.get('port'))});
