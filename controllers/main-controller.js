//
// *************************************************************************************************
//                              controllers/rendering-controller.js  
//
//      THIS PAGE WILL HANDLE ANYTHING DEALING WITH GATHERING STATIC INFORMATION AND RENDERING 
//                              IT THROUGH TO THE HANDLEBARS
//
// *************************************************************************************************

var db = require("../models");
// Including the modules for Customers
var getCustomers = require('./customers.js');

//Including the modules for Services
var getServices = require('./services.js')

//Including the modules for Providers
var getProviders = require("./providers.js");

//Including the modules for Appointments
var getAppointments = require('./appointments.js');

//Including the modules for Schedules
var getSchedules = require('./schedules.js')


var exports = module.exports = {};


//Sets viewBuilder as global so it can be access by all routes
var viewBuilder = {};

// This Function will handle logic for when users go to the path '/'
// This will figure out if there's a user already logged in by checking if(req.user) and redirect back to /home + the other params. If there's no user just redirect to /home
exports.Welcome = function (req, res, next) {
    if (req.user) {
        res.redirect('/home/' + req.user.userType + '/' + req.user.id)
    } else {
        res.redirect('/home');
    }

}


// This function will be the main function that buils the viewBuilder containing all the stuff we're going to need to render in views and will be created at the '/hjome' path
exports.home = function (req, res) {
    //If there's no user logged in this will be the basic view builder
    viewBuilder = {
        LoggedIn: false,
        messageLogIn: req.flash('logInMessage'),
        messageSignIn: req.flash('signUpMessage'),
        messagesettingsMessage: req.flash('settingsMessage'),
        appointmentMsg: req.flash('AppointmentMsg'),
        admin: false
    };

    // If there is a user logged all of this will be added to viewBuilder
    if (req.user) {
        viewBuilder.LoggedIn = true;
        viewBuilder.userId = req.user.id;
        viewBuilder.firstName = req.user.firstName;
        viewBuilder.lastName = req.user.lastName;
        viewBuilder.email = req.user.email;
        viewBuilder.phoneNumber = req.user.phone;
        viewBuilder.notes = req.user.notes;
        viewBuilder.photoLink = req.user.photoLink;
        viewBuilder.userType = req.user.userType;
        //Doing this to keep our site routing look clean 
        //If you have a new htmlRoute please build it here and in handlebars do a 'if LoggedIn statement' with the links
        viewBuilder.homeRoute = '/home/' + req.user.userType + '/' + req.user.id;
        viewBuilder.aboutRoute = '/about/' + req.user.userType + '/' + req.user.id;
        viewBuilder.scheduleRoute = '/schedule/' + req.user.userType + '/' + req.user.id;
        viewBuilder.updateRoute = "/update/" + req.user.userType + "/" + req.user.id;
        viewBuilder.serviceRoute = "/service/" + req.user.userType + "/" + req.user.id;


        //If a user is a Admin set the admin equal to true
        if (req.user.userType === 'admin') {
            viewBuilder.admin = true;
        }
    };


    // console.log(viewBuilder);


    res.render('home', viewBuilder);

}

// Handles for when user goes to the path '/about'
exports.about = function (req, res) {
    var data = {};
    getProviders.AllProviders(data,function(err,results){
        if(err) console.log(err);


        viewBuilder.TopProviders = [];

        for(var i= 0; i < 2; i++){
            var stylist = {
                email: results[i].provider.email,
 
                firstName: results[i].provider.firstName,

                lastName: results[i].provider.lastName,

                phone: results[i].provider.phone,

                experience: results[i].provider.experience,

                title: results[i].provider.title,

                notes: results[i].provider.notes,

                photoLink: results[i].provider.photoLink
            };


            viewBuilder.TopProviders.push(stylist);

        }
        
        console.log("THIS IS IT" + viewBuilder);
        res.render('about', viewBuilder);
    })
   
};




// Handles when users go to providers page!!!***THIS FUNCTION STILL NEEDS MORE INFORMATION TO BE GATHERED BEFORE IT CAN RENDER ALL STATIC INFORMATION ON THIS PAGE
exports.provider = function (req, res) {
    var data = {

    };

    getCustomers.AllInfo(data,function (err, clients) {
        console.log(clients);
        viewBuilder.Customers = clients;
        console.log(viewBuilder);
        res.render('provider', viewBuilder);
    });


};


// Handles when users go to services page!!!

exports.service = function (req, res) {

    res.render('service', viewBuilder);


};


exports.schedule = function (req, res) {

   var data = {
       groupBy : 'service_name',
       order : 'price',
   };

   console.log("HELLOOO");

    getServices.AllServices(data,function(err,results){
        if(err) console.log(err);

        viewBuilder.service_names = [];
        console.log(results[0].dataValues);
        for(var i = 0; i < results.length; i++){
            var serviceNames = {
                name : results[i].dataValues.service_name
            };
            viewBuilder.service_names.push(serviceNames);
        };


        console.log(viewBuilder.service_names);
        res.render('schedule', viewBuilder);

    });

  

};





//
//
//  These functions below are functions that handle calls from the front end
//
//


exports.getServices = function (req, res) {
    getServices.AllServices(function (results) {
        res.json(results);
    });
}


exports.updateAppointment = function (req, res) {
    var data = {
        id: req.params.id,
        startTime: req.body.id,
        endTime: req.body.endTime,
        duration: data.duration
    };
    getAppointments.update(data, function (results) {
        console.log(results);

        res.redirect()
    })
};


exports.createAppointment = function (req, res) {
    var data = {
        startTime: req.body.id,
        endTime: req.body.endTime,
        duration: data.duration
    };
    getAppointments.newAppointment(data, function (results) {
        console.log(results);

        res.redirect()
    })
};


// Allows users to log out
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}