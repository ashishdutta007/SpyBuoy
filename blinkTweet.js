var mraa = require('mraa');
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'VeuGh3jZBd14iDv1kAEsqF1Id',
	consumer_secret: 'mHv0OmxDSELIVocu18Mj3LlAAoaBzLqoA5N3uSXgqcrruO3rQS',
	access_token_key: '4075978940-M2RsGnrYkb7X4tJIyxVGJMSQdMROtNd4NodybOF',
	access_token_secret: 'F5rZqpMc2wr5n7tzd8CkRTRdFCfhjxJIhP5ESbi2fmfLX'
});

var pin13 = new mraa.Gpio(13);
pin13.dir(mraa.DIR_OUT);

var latestTweetTime = new Date();
latestTweetTime.setMonth(0);
latestTweetTime.setDate(0);
latestTweetTime.setTime(0);
latestTweetTime.setFullYear(0);
latestTweetTime.toUTCString();


var params = {
	screen_name: 'theokeles_050'
};
var status;
var createdAt;

function searchTweets() {
	client.get('search/tweets', {
		q: 'theokeles_050'
	}, function(error, data, response) {
		if (!error) {
			for (var i = 0; i < data.statuses.length; i++) {
				status = data.statuses[i];
				createdAt = new Date(status.created_at);
				if (latestTweetTime.getTime() >= createdAt.getTime()) {
					break;
				}
				if (status.text.indexOf("Edison") > -1) {
					console.log("Got the tweet - " + status.text + " !!!");
					blink();
					break;
				}
			}
			//Here lastestTweetTime refers to the last tweet in the handle
			latestTweetTime = new Date(data.statuses[0].created_at);
			console.log("last check recorded at - " + latestTweetTime);
		} else {
			console.log(error);
		}
	});
}

setInterval(searchTweets, 10000);


function blink() {
	for (var i = 0; i < 3; i++) {
		pin13.write(1);
		setTimeout(function() {
			pin13.write(0)
		}, 1000);
	}
}