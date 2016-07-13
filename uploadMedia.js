var twitter = require('twitter');
var fs = require('fs');

var mraa = require('mraa');
var pin13 = new mraa.Gpio(13);
pin13.dir(mraa.DIR_OUT);


var client = new twitter({
    consumer_key: 'VeuGh3jZBd14iDv1kAEsqF1Id',
    consumer_secret: 'mHv0OmxDSELIVocu18Mj3LlAAoaBzLqoA5N3uSXgqcrruO3rQS',
    access_token_key: '4075978940-M2RsGnrYkb7X4tJIyxVGJMSQdMROtNd4NodybOF',
    access_token_secret: 'F5rZqpMc2wr5n7tzd8CkRTRdFCfhjxJIhP5ESbi2fmfLX'
});

var content = fs.readFileSync('index.jpg');

client.post('media/upload', { media: content }, function(error, data, response) {
    if (!error) {
        console.log("Hey got some media riding on you");
        console.log(data);
        var mediaIdStr = data.media_id_string;
        var params = { status: 'Go here!!!', media_ids: mediaIdStr };

        client.post('statuses/update', params, function(error, data, response) {
            if (!error) {
                console.log("tweet madi again");
                for (var i = 0; i < 3; i++) {
                    pin13.write(1);
                    pin13.write(0);
                }
                console.log(data);
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(error);
    }
});
