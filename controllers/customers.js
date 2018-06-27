// *************************************************************************************************
//                              controllers/customer-api.js  
//      This file will contain all the functions required to get any information retaining to 
//                          Customers and pass it back through a callback
//
//      This file will also contain the functions that deal with user intractions with the database
// *************************************************************************************************

// Requiring our database
var db = require("../models");



//
var exports = module.exports = {};


    // This function will gather all information about each and every Customer and pass it back through a callback
    exports.AllInfo = function(data, cb){
        var query = {};
        if(data.id){
            query.id = data.id
        };
        db.Customers.findAll(query).then(function(dbCustomers){
            console.log(dbCustomers);
            if(dbCustomers.length > 0){
                var customers = [];
                for(var i =0; i < dbCustomers.length; i++){
                    dbCustomers[i].dataValues.modalID ="#settings" + dbCustomers[i].id + "Modal";
                    dbCustomers[i].dataValues.ModalID = "settings" + dbCustomers[i].id + "Modal";
                    var customerObj = {
                        customer: dbCustomers[i].dataValues};
    
                    customers.push(customerObj);
                }
                console.log(dbCustomers[0].dataValues);
                console.log(dbCustomers[1].dataValues);
                console.log(customers);
                cb(null, customers);
            }
     
        });

    };

    // This function will allow users to make appointments 
        
        //The callback should simply be either true or false. False meaning the request to make the appointment failed. True meaning making the appointment succeeded
    exports.makeAppointment = function(cb){
        
    };

