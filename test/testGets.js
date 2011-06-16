var express = require('express')
   , assert = require('assert')
   , app = require('../server');

exports.testGetRoot = function(){
    assert.response(app, 
        { url: "/" },
        { status: 200},
        function(res){
          assert.includes(res.body, '<title>Express</title>');
        });
};

