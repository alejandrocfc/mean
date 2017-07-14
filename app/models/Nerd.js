// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: String
});

// the schema is useless so far
// we need to create a model using it
var Nerd = mongoose.model('nerds', userSchema);

// make this available to our users in our Node applications
module.exports = Nerd;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
/*module.exports = mongoose.model('Nerd', {
	name : {type : String, default: ''}
});*/
