var redis = require("redis");

module.exports = function(app){
    
    //Handle posts
    app.post('/post/:id', function(req, res){
        console.log(req.params.id);
        console.log(req.body);
        client = redis.createClient();
        client.on("error", function (err) {
            console.log("Redis connection error to " + client.host + ":" + client.port + " - " + err);
        });
        
        client.set(req.params.id, JSON.stringify(req.body), redis.print);
        client.quit();
        res.end();
    });
}
