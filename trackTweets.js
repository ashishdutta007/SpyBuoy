var _ = require('underscore');

var mraa = require('mraa');
var pinLed = new mraa.Gpio(13);
pinLed.dir(mraa.DIR_OUT);

var twitter = require('twitter');
var client = new twitter({
	consumer_key: 'VeuGh3jZBd14iDv1kAEsqF1Id',
	consumer_secret: 'mHv0OmxDSELIVocu18Mj3LlAAoaBzLqoA5N3uSXgqcrruO3rQS',
	access_token_key: '4075978940-M2RsGnrYkb7X4tJIyxVGJMSQdMROtNd4NodybOF',
	access_token_secret: 'F5rZqpMc2wr5n7tzd8CkRTRdFCfhjxJIhP5ESbi2fmfLX'
});

var lastTweetTimeStamp = new Date();
lastTweetTimeStamp.setFullYear(0);
lastTweetTimeStamp.setDate(0);
lastTweetTimeStamp.setMonth(0);
lastTweetTimeStamp.setTime(0);
lastTweetTimeStamp.toUTCString();

var handle = 'theokeles_050';
var status;
var result;

function trackTweet() {
	client.get('search/tweets', {
		q: handle
	}, function(error, data, response) {
		if (!error) {
			result = data;
			status = data.statuses;
			for (var i = 0; i < status.length; i++) {
				var created_at = new Date(status[i].created_at);
				console.log("lasttweetTimeInSecs- " + lastTweetTimeStamp.getTime());
				console.log("created_atTimeInSecs- " + created_at.getTime());
				if (lastTweetTimeStamp.getTime() >= created_at.getTime()) {
					break;
				} else {
					console.log("lastTweetTimeStamp - " + lastTweetTimeStamp);
					console.log("created_at- " + created_at);
					//if (status[i].text == "Hello Edison") {
					if (status[i].text.indexOf("Edison") > -1) {
						console.log(lastTweetTimeStamp);
						console.log(created_at);
						console.log("Text- " + status[i].text);
						lastTweetTimeStamp = created_at;
						//Here lastTweetTimeStamp is the last tweet containing "Edison"
						//lastTweetTimeStamp = new Date(status[i].created_at);
						for (var i = 0; i < 5; i++) {
							blinkLED();
						}
						break;
					}
				}
			}
		} else {
			console.log(error);
		}
	});
}

setInterval(trackTweet, 5000);

function blinkLED() {
	console.log("led madi!!!")
	pinLed.write(1);
	setTimeout(function() {
		pinLed.write(0)
	}, 500);
}