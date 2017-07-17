/**
 * Created by amora on 17/07/2017.
 */
// grab the mongoose module
var mongoose = require('mongoose');

// create a schema
var paraqueSchema =  mongoose.Schema({
    title: String,
    content: String,
    products: Array //image 353*326
});

var collectionName = 'paraque';

// the schema is useless so far
// we need to create a model using it
var Paraque = mongoose.model('paraque', paraqueSchema, collectionName);

// make this available to our users in our Node applications
module.exports = Paraque;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
/*module.exports = mongoose.model('Nerd', {
 name : {type : String, default: ''}
 });*/



