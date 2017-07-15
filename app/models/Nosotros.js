/**
 * Created by Dell on 15/07/2017.
 */
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    content: String,
    image: String
});

// the schema is useless so far
// we need to create a model using it
var Nosotros = mongoose.model('nosotros', {});

// make this available to our users in our Node applications
module.exports = Nosotros;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
/*module.exports = mongoose.model('Nerd', {
 name : {type : String, default: ''}
 });*/


