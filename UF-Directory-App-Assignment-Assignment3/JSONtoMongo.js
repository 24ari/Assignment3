'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */

mongoose.connect(config.db.uri);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

fs.readFile('listings.json','utf8',function(err,data){ 
   var listingData = JSON.parse(data); 
        
 for(var i=0; i<listingData.entries.length; i++){ 
  
   var listing = new Listing({  //creating many instances of model Listing so that we 
     //can create a record for each object in listingData
       code: listingData.entries[i].code,
       name: listingData.entries[i].name,
       coordinates: listingData.entries[i].coordinates,
       address: listingData.entries[i].address
     });

     listing.save(function(err){ //saving new model
         if(err)throw err;
         //console.log('save');
     });
 }

});


//compile model from schema
//first argumente is singular name of the collection that wil 
//be created for your model. Second argument is the schema you want
//to use in creating the model


// Schema takes a javascript object as a parameter. You'll have to assign a javascript object with the correct props to model a listing for assignment 3. Props of a model can also have optional constraints. 


// The model just takes the name of what you'd like to call your model and a Schema instance.


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

//  Using models
// Once you've created a schema you can use it to create models. 
// The model represents a collection of documents in the database 
// that you can search, while the model's instances represent 
// individual documents that you can save and retrieve.