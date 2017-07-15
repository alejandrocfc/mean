/**
 * Created by amora on 14/07/2017.
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
var Slider = mongoose.model('sliders', {});

// make this available to our users in our Node applications
module.exports = Slider;

