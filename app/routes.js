module.exports = function(app, passport) {

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
    var Paraque = require('./models/Paraque');


    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {

    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
    });

    // process the login form
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

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

    // ROUTES
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

    app.get('/api/paraque', function(req, res) {
        // use mongoose to get all nerds in the database
        Paraque.findOne({}, function(err, data) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }else if(data){
                res.json(data); // return all nerds in JSON format
            }else{res.send({msg:'HELLO'});}

        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}