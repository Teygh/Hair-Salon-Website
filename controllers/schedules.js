//
// *************************************************************************************************
//                                      controllers/schedule.js  
//
//      THIS PAGE WILL HANDLE ANYTHING DEALING WITH GATHERING STATIC INFORMATION AND RENDERING 
//                              IT THROUGH TO THE HANDLEBARS
//
// *************************************************************************************************


//Importing our database
var db = require("../models");

var exports = module.exports = {};

    //This functions is.... uhh getting all Schedules with joined Appointments then right joining it with Providers o.O? Good luck.. It passes the information back through a callback
    exports.getWithAppRProv = function(data, cb){
        var query = {};
        if(data.groupBy){
            query.group = data.groupBy;
        };    
        if(data.orderBy){
            if(data.direction === 'DESC'){
                query.order = [[data.orderBy, 'DESC']]
            }else {
                query.order = [[data.orderBy]];
            }

        }  

        if(data.provider_id){
            query.where = {
                ProviderId : data.provider_id
            };
        };
        query.include = [{all:true}]

        console.log(query);
        db.Schedules.findAll(query).then(function(dbSchedules) {
                  if(dbSchedules.length > 0){
                    cb(null, dbSchedules);
                  }else{
                    cb({message: "There was an error finding what you're looking for. Please check your queries if they exists in the database."});

                  }
              });
    }

    exports.newSchedule = function(data,cb){
        db.Schedules.create(data).then(function(affectedRows){

            cb(null,affectedRows);
        })
    };

    exports.updateSchedule = function(data,cb){
        db.Schedules.update(data).then(function(affectedRows){
            cb(null,affectedRows);
        });
    };