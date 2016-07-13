var twitter = require('twitter');
var client = new twitter({
	consumer_key: 'VeuGh3jZBd14iDv1kAEsqF1Id',
	consumer_secret: 'mHv0OmxDSELIVocu18Mj3LlAAoaBzLqoA5N3uSXgqcrruO3rQS',
	access_token_key: '4075978940-M2RsGnrYkb7X4tJIyxVGJMSQdMROtNd4NodybOF',
	access_token_secret: 'F5rZqpMc2wr5n7tzd8CkRTRdFCfhjxJIhP5ESbi2fmfLX'
});

var result;

var mraa = require('mraa');
var pin13 = new mraa.Gpio(13);
pin13.dir(mraa.DIR_OUT);
var params = {
	screen_name: 'theokeles_050'
};


function getTweets() {
	client.get('statuses/user_timeline', params, function(error, data, response) {
		if (!error) {
			var time = data[0].created_at;
			var text = data[0].text;
			console.log(time);
			console.log(text);
			if (text == '#IoT #Edison') {
				pin13.write(1);
				setTimeout(function() {
					pin13.write(0);
				}, 1000);
			}
		} else {
			console.log(error);
		}
	});
}

setInterval(getTweets, 500);