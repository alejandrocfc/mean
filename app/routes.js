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
        res.sendFile('nerd.html');
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // LOGIN ===================================
    app.post('/api/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return res.send('1') }
            if (!user) { return res.send('0'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send('2');
            });
        })(req, res, next);
    });

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