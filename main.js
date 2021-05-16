'use strict';

var express = require('express');
var app = express();
var Twitter = require('twitter');
var http = require('http');
var generate = require('./lib/generate');
var port = process.env.PORT || 3000;

var tweetInterval = process.env.TWEET_INTERVAL || 1800000;

var tweet = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function makeTweet(){
    var content = generate();
    tweet.post('statuses/update', {status: content}, function(error, tweet, res){
        if (error) throw error;
        console.log('Posted tweet;\" '+ content+' \" ')
    });
}

app.get('/', function(req,res){
    res.send('Congratulations, you sent a GET request');
    console.log('Receive a GET request and sent a response');
});

app.listen(port, function(){
    console.log('App now listening on port', port);
});

function keepAlive() {
    try{
        http.get('https://enoctweetbot.herokuapp.com/')
        console.log('GET request sent; Kept alive.');
    } catch(e){
        console.log(e);
    }
}

makeTweet();
setInterval(makeTweet, tweetInterval);
setInterval(keepAlive, 600000)