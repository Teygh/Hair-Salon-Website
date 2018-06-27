// Dependencies
// =============================================================
var goTo = require('../controllers/main-controller.js');
var servicesPack = require('../controllers/services.js');
var providersPack = require('../controllers/providers.js');
var schedulesPack = require('../controllers/schedules.js');
var appointmentsPack = require('../controllers/appointments.js');

var customersPack = require('../controllers/customers.js');
module.exports = function(app){
//
// ROUTES for SERVICES
//

    // GET route to get services within a range defined by the queries range with providers who offer that service
    app.get('/api/retrieve/services', function (req, res) {
        //Check read me for query list
        var data = {};



        if (req.query.orderBy) {
            switch (req.query.orderBy) {
                case 'category':
                    data.order = 'category';
                    break;
                case 'price':
                    data.order = 'price';

                    break;
                default:
                    res.json('Invalid input for oderBy=');
                    break;
            };
            switch (req.query.direction) {



                case 'DESC':
                    data.direction = 'DESC';
                    break;
                default:
                    data.direction = "AESC";
                    break
            }
        }

        
        if(req.query.all === 'yes'){
            data.specific = 'no';
            servicesPack.AllServices(data,function(err,results){
                console.log(results);
                res.json(results);
            })

        }else if(req.query.all === 'group'){
            switch(req.query.groupBy){
                case 'category':
                    data.groupBy = req.query.groupBy;
                    servicesPack.AllServices(data, function(err,results){
                        if(err) res.json(err);
                        res.json(results);
                    })
                break;
                default:
                    data.groupBy = 'service_name';
                    servicesPack.AllServices(data, function(err,results){
                        if(err) res.json(err);
                        res.json(results);
                    })


            }
        } else if (req.query.all === 'no') {
            data.specific = req.query.specific;
            switch (data.specific) {
                case 'service':
                    if (req.query.service_name) {
                        data.service_name = req.query.service_name;
                        servicesPack.AllServices(data,function(err,results){
                            if(err) res.json(err);


                            res.json(results);
                        });

                    }else{

                        res.json('Missing service_name');
                    }

                    break;
                case 'provider':

                    if (isNaN(req.query.provider_id) === false) {
                        data.provider_id = req.query.provider_id;

                        servicesPack.AllServices(data,function(err,results){
                            if(err) res.json(err);

                            res.json(results);
                        })

                    }else {

                        res.json('provider_id must be a number');
                    }
                    break;
                default: {
                    res.json('Please include specific specific can only be service or provider')
                }
            }

        }else{
            servicesPack.AllServices(data,function(err,results){
                if(err) res.json(err);

                res.json(results);
            });
        }
        





    });

    //PUT route to update service by ID THIS SHOULD ONLY BE ABLE TO BE ACCESSED BY ADMIN
    app.put('/api/service/:id', function (req, res) {

        //Build object to pass on to update service
        var data = {
            //Will be used to figure out which service we're updating will be retrieved from parameter
            serviceID: req.params.id,
            serviceName: req.body.serviceName,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,

            photoLinks: data.photoLinks
        };

        servicesPack.updateService(data, function (results) {
            res.json(results);
        })
    })


    //POST route to create a new service

    app.post('/api/service', function (req, res) {
        //Build the service data

        var data = {
            service_name: req.body.service_name,
            category:req.body.category,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,
            photoLinks: req.photolinks,
            ProviderId: req.ProviderId
        };

        servicesPack.newService(data, function (results) {
            console.log(results);
            res.json(results);
        });
    });


    //DELETE route to delete service by ID
    app.delete('/api/delete/service/:id', function (req, res) {
        //Get service id from params to delete service
        var data = {
            id: req.params.id
        };
        servicesPack.removeService(data, function (err, results) {
            res.json(results);
        });
    });

    //
    // ROUTES for Providers **in progress**
    //

    //GET route to retrieve information about providers

    app.get('/api/retrieve/providers', function(req,res){

        var data = {};
        //Check word doc on how to use it
        switch (req.query.services) {
            case 'yes':
                data.services = 'yes';

                break;
            default:

                break;
        }
        switch (req.query.schedule) {
            case 'yes':
                data.schedule = 'yes';
                break;
            default:
                break;
        }

        if(req.query.provider_id){
            switch(isNaN(req.query.provider_id)){
                case false:
                    if(req.query.provider_id > 0){
                        data.provider_id = req.query.provider_id;
                    }else{
                        res.json('Please use a number greater than 0 for provider_id');
                    }
                break;
                default:
                    res.json('Please use a number for provider_id');
                break;
        }

        }

        providersPack.AllProviders(data, function(err, results){
            if(err) res.json(err);

            console.log(results);
            res.json(results);
        })
    })


    //
    // Routes for APPOINTMENTS **in progress**
    //

    //GET route to get appointments within a range defined by the queries 

    app.get('/api/retrieve/schedule', function(req,res){

        var data = {};
        if (req.query.orderBy) {
            switch (req.query.orderBy) {
                case "start":
                    data.orderBy = 'startTime';
                    break;

                case 'end':
                    data.orderBy = 'endTime';
                    break;

                default:
                    res.json('Invalid query orderBy=');
                    break;
            }
            switch (req.query.direction) {
                case 'DESC':
                    data.direction = 'DESC';
                    break;
                default:
                    data.direction = 'AESC';
                    break;

            }
        }

        if (req.query.provider_id) {
            switch (req.query.provider_id > 0) {
                case true:
                    data.provider_id = req.query.provider_id;
                    break;
                default:
                    res.json('Invalid entry for provider_id=. Please use a number greater than 0');
                    break;
            }
        }


        schedulesPack.getWithAppRProv(data, function (err, results) {
            if (err) res.json(err);

            res.json(results);
        })
    })

    //To make a new schedule
    app.post('/api/schedules', function (req, res) {
        var data = req.body;
        var newSchedule = {
            startTime: data.startTime,
            endTime: data.endTime,
            ProviderId: data.ProviderId
        };

        schedulesPack.newSchedule(newSchedule, function (err, results) {
            if (err) res.json(err);

            res.json(results);
        })

    })

    app.put('/api/schedules', function (req, res) {
        var data = req.body;
        var updateSchedule = {
            startTime: data.startTime,
            endTime: data.endTime,
            ProviderId: data.ProviderId
        };

        var datas = {
            scheduleBuild: updateSchedule,
            where: {
                id: data.schedule_id
            }
        };
        schedulesPack.newSchedule(datas, function (err, results) {
            if (err) res.json(err);

            res.json(results);
        })

    })


    //
    // Routes for Appointments
    //

    app.post('/appointment/update/:id', goTo.updateAppointment);


    //Post route to create a new appointment 
    app.post('/appointment/new/', function(req,res){
        console.log(req.body);
 
        var data = {
            CustomerId : req.body.customerID,
            ProviderId : req.body.provider_id,
            ScheduleId : req.body.scheduleID,
            appointStart : req.body.startTime,
            appointEnd : req.body.endTime,
            duration : req.body.duration
        };

        appointmentsPack.newAppointment(data, function(err,results){
            if(results){
                req.flash('AppointmentMsg', "You've made your appointment!");
                res.redirect('/')
            }
            
        })
    });

    app.get('/api/retrieve/customer', function(req,res){

        var data = {};
        if(req.query.customer_id){
            data.id = req.query.customer_id;
        }
        if(req.query.orderBy){
            data.order = req.query.orderBy;
        };
        customersPack.AllInfo(data,function(err,results){
            if(err) res.json(err);

            res.json(results);
        })

    })

}




// FUNCTIONS THAT BE USED FOR AUTHORIZATION FOR EACH ROUTE

function isAdmin(req, res, next) {

    if (req.isAuthenticated() && req.user.admin === true)


        return next();
    //Redirects home with a loginMessage flash message
    req.flash('logInMessage', "Yikes");

    res.redirect('/');

}

//////////////////////////////////////
//Seed data for Services Model

// db.Services.create(
//     { category: 'Cuts', service_name: "Men's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "30", created_at: new Date(Date.UTC(Date)), updated_at: new Date(Date.UTC(Date)) })
//     .then( service =>{
//         console.log(service.category);
//         console.log(service.service_name);
//         console.log(service.price);
//     });

    // { category: 'Cuts', service_name: "Women's Cut and Style", description: "Scissor cut and style", duration: "00:30:00", price: "65" },
    // { category: 'Cuts', service_name: "Child's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "20" },
    // { category: 'Color', service_name: "Full Color", description: "Scalp to end - long hair or short", duration: "02:00:00", price: "120" },
    // { category: 'Color', service_name: "Re-growth Color", description: "Roots - top of crown", duration: "01:30:00", price: "40" },
    // { category: 'Color', service_name: "Highlights", description: "Full foils throughout", duration: "01:30:00", price: "115" },
    // { category: 'Color', service_name: "Partial Highlights", description: "Top of crown and face framing", duration: "01:30:00", price: "65" },
    // { category: 'Revive', service_name: "Deep Condition", description: "Intense condition and heat for healing", duration: "01:00:00", price: "55" },
    // { category: 'Revive', service_name: "4 Step Healing Rejuvenation", description: "4 step cleanse, nourish, hydrate, condition", duration: "01:00:00", price: "75" }



// }
