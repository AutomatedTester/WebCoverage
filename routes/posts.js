var redis = require("redis");

module.exports = function(app){
    
    /* Handle posts of the data that we need.
     * :id is the ID of the test while it is running. 
     * The body of the request will have a JSON object that shows what 
     * the test has been doing
     */
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
