var express = require('express')
   , assert = require('assert'),
   server = require('../server');

exports.testPostOfData= function(){
    assert.response(server, 
        { url: "/posts", method: 'POST' },
        { body: "zomg it's broked!", status: 500});
};
