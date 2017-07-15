module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
/*	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});*/

    // grab the nerd model we just created
    var Nerd = require('./models/Nerd');
    var Slider = require('./models/Slider');
    var Nosotros = require('./models/Nosotros');

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

    // sample api route
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find({}, function(err, nerds) {
            console.log('NERDS: ', nerds);
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }else if(nerds.length > 0){
                res.json(nerds); // return all nerds in JSON format
            }else{res.send({msg:'HELLO'});}

        });
    });

    // sample api route
    app.get('/api/slider', function(req, res) {
        // use mongoose to get all nerds in the database
        Slider.find({}, function(err, slider) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }else if(slider.length > 0){
                res.json(slider); // return all nerds in JSON format
            }else{res.send({msg:'HELLO'});}

        });
    });

    app.get('/api/nosotros', function(req, res) {
        // use mongoose to get all nerds in the database
        Nosotros.findOne({}, function(err, data) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }else if(data){
                res.json(data); // return all nerds in JSON format
            }else{res.send({msg:'HELLO'});}

        });
    });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        app.get('/', function(req, res) {
            res.sendfile('./public/views/home.html'); // load our public/index.html file
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        //app.get('*', function(req, res) {
        //    res.sendfile('./public/index.html'); // load our public/index.html file
        //});

};