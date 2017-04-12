var fs = require("fs");
var request = require('request');
var nodeArgs = process.argv;
var movieName = "";
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');



var userInput = nodeArgs.slice(3).join(" ");
var command = nodeArgs[2];

controller(command,userInput);


function controller(command,userInput){


switch(command){

	case "movie-this": 
		movieThis(userInput);
		break;

	case "my-tweets":
	myTweets(userInput);
		break;

	case "spotify-this-song":
		spotifyThisSong(userInput);
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
		default: console.log("error");

	}
}



 function myTweets(){

 		var client = new Twitter({
 			consumer_key: keys.twitterKeys.consumer_key,
 			consumer_secret: keys.twitterKeys.consumer_secret,
 			access_token_key: keys.twitterKeys.access_token_key,
 			access_token_secret: keys.twitterKeys.access_token_secret,
 			});


		var params = {screen_name: 'mercy_alliance'};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
     //console.log(tweets);
    // var recentTweets = JSON.parse(tweets);
    // console.log(typeof JSON.parse(recentTweets[0]));
    		for (id in tweets ){
    		var tweet = tweets[id]
    		console.log(tweet.created_at);
    		console.log(tweet.text);
    		console.log("\n");
    		}

  		}
  		else{

  		console.log(error);

  			}
		});
}

	

	function doWhatItSays(){

		fs.readFile("./random.txt","utf8",function(err,data){
			if(!err){

					var dataArray = data.split(',');
				
					 userInput = dataArray[1];
				 	command = dataArray[0];
					controller(command, userInput);

			}
		//console.log(data);
	
			});
	}




function spotifyThisSong(songName){
	if(songName === undefined){
		songName = "The Sign";
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }


    // else if(!songName){
    // 	console.log("You didn't enter a song name");
    // 	songName = "The Sign";
    // 	spotifyThisSong(songName);
    // }
 		

    	else{
 		// console.log(data.tracks.items[0].album);
    	console.log("Name : " + data.tracks.items[0].name);
       	console.log("Preview URL : " + data.tracks.items[0].preview_url);
        console.log("Artist : " + data.tracks.items[0].album.artists[0].name);
    //console.log(JSON.parse(data).tracks.items[0]);
		}
	});



}




function movieThis(movieName){	
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	request(queryUrl, function(error,response, body){

		if (!error && response.statusCode === 200){
			//console.log(body);
			console.log("Title : " + JSON.parse(body).Title);
			console.log("Release year: " + JSON.parse(body).Year);
			console.log("IMDB Rating : " +JSON.parse(body).Ratings[0].Value);
			console.log("Language : " + JSON.parse(body).Language);
			console.log("Plot : " + JSON.parse(body).Plot);
			console.log("Actors : " + JSON.parse(body).Actors);
			console.log("Rotten Tomatoes rating : " + JSON.parse(body).Ratings[1].Value);

		}
	});
}




