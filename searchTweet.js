var twitter = require('twitter');
var client = new twitter({
    consumer_key: 'VeuGh3jZBd14iDv1kAEsqF1Id',
    consumer_secret: 'mHv0OmxDSELIVocu18Mj3LlAAoaBzLqoA5N3uSXgqcrruO3rQS',
    access_token_key: '4075978940-M2RsGnrYkb7X4tJIyxVGJMSQdMROtNd4NodybOF',
    access_token_secret: 'F5rZqpMc2wr5n7tzd8CkRTRdFCfhjxJIhP5ESbi2fmfLX'
});

var mraa = require('mraa');
var pin13 = new mraa.Gpio(13);
pin13.dir(mraa.DIR_OUT);

client.get('search/tweets', { q: 'theokeles_050' }, function(error, data, response) {
    if (!error) {
        for (var i = 0; i < 3; i++) {
            blink();
        }
        console.log(data);
    } else {
        console.log(error);
    }
});

function blink() {
    pin13.write(1);
    setTimeout(function() {
        pin13.write(0);
    }, 1000);
}
