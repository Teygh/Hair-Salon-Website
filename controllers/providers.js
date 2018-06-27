// *************************************************************************************************
//                              controllers/provider-api-routes.js  
//      This file will contain all functions to retrieve any data retaining to the Providers model 
//                              and pass it back through a callback
//
//   This file will also contain the functions that deal with Provider intractions with the database
// *************************************************************************************************


//Importing our database
var db = require("../models");


var exports = module.exports = {};

  exports.AllProviders = function(data, cb){
    var query = {};
    if(data.services){
      query.include = [db.Services];
      };
    if(data.schedule){
      if(query.include){
        query.include.push(db.Schedules);
      }else{
        query.include = [db.Schedules];
      }
    }
    if(data.provider_id){
      query.where = {
        id : data.provider_id
      };
    };
    console.log(query);
    db.Providers.findAll(query).then(function(dbProviders){
      if(dbProviders.length > 0 ){
        var providers = []
        for(var i = 0; i < dbProviders.length; i++){
          var providersObj = {
            provider: dbProviders[i].dataValues
          };

          providers.push(providersObj);
      };
         cb(null, providers);
      }else {
        cb({message: "There was an error finding what you're looking for. Please check your queries if they exists in the database."})
      }

    });

  }



  // This function will take a data object as an arugment to update Provider information and pass back through a callback if it failed or succeeded
  exports.update = function(data,cb){

  }

  // This function will take a data object as an arugment to create a new Provider and pass back through a callback if it failed or succeeded

  exports.newProvider = function(data,cb){
    
  }