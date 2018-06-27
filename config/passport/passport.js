var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, Customer, Provider) {
    var User = Customer;
    var Admin = Provider;
    var LocalStrategy = require('passport-local').Strategy;
    //serialize
    passport.serializeUser(function(user, done) {
        var info = {
            id : user.id,
            type: user.userType
        }
        done(null, info);
 
    });
    // deserialize user 
    passport.deserializeUser(function(info, done) {
        var id = info.id;
        if(info.type === 'customer'){

            User.findById(id).then(function(user) {
 
                if (user) {
     
                    done(null, user.get());
     
                } else {
     
                    done(user.errors, null);
     
                }
     
            });

        }else {
            Admin.findById(id).then(function(admin) {
 
                if (admin) {
     
                    done(null, admin.get());
     
                } else {
     
                    done(admin.errors, null);
     
                }
     
            });
        }

 
    });

//******************************LOCAL STRATEGIES FOR CUSTOMERS**********************************//
    // LOCAL SIGN UP
    passport.use('customer-local-signup', new LocalStrategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
     
        },
        function(req, email, password, done) {
            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
             
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
             
                if (user)
             
                {
             
                    return done(null, false, req.flash('signUpMessage','That email is already taken'));
       
                } else
             
                {
             
                    var userPassword = generateHash(password);
             
                    var data =
             
                        {
                            email: email,
             
                            firstName: req.body.firstName,

                            lastName: req.body.lastName,

                            phone: req.body.phone,

                            password : userPassword
             
                            
                        };
             
                    User.create(data).then(function(newUser, created) {
                        console.log(created);
                        if (!newUser) {
             
                            return done(null, false, req.flash('signUpMessage', "There was an error in creating your account!"));
             
                        }
             
                        if (newUser) {
                            
                            var UserInfo = newUser;
                            delete UserInfo.password;
                            return done(null, UserInfo);
             
                        }
             
                    });
             
                }
             
            });
        }
    ));


    //LOCAL SIGNIN
    passport.use('customer-local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'email',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, email, password, done) {
 
        var User = Customer;
    
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
 
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, req.flash('logInMessage', 'Email does not exist'));

            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, req.flash('logInMessage','Incorrect password.'));

            }
 


            var UserInfo = user;
            delete UserInfo.password;
            return done(null, UserInfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, req.flash('logInMessage','Something went wrong with your Signin'));

        });
 
 
    }
 
));
    // LOCAL UPDATE
    passport.use('customer-local-update', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            console.log(req);

            var User = Customer;
            var isValidPassword = function(userpass, password) {
 
                return bCrypt.compareSync(password, userpass);
     
            };
            console.log(req.params)
            User.findOne({
                where: {
                    id: req.params.userId
                }
            }).then(function(user){
                console.log(user);
                if (!user) {
 
                    return done(null, false, req.flash('settingsMessage', 'There was an error with your request. Please try again.'));
    
                }
     
                if (!isValidPassword(user.password, password)) {
     
                    return done(null, false, req.flash('settingsMessage','Incorrect password.'));
    
                }else {

                    User.update({
                        email : email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phone: req.body.phone
                    },{
                        where: {id : req.params.userId}
                    }).then(function(results){
                        User.findOne({
                            where: {
                                id: req.params.userId
                            }
                        }).then(function(user){
                            var UserInfo = user;
                            delete UserInfo.password;
                            return done(null, UserInfo)
                        });
                        
                    });
                };


            });
        }
    ));
//********************************************ADMIN LOCAL STRATEGIES****************************************** */
  // LOCAL SIGN UP
  passport.use('admin-local-signup', new LocalStrategy(
 
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
    function(req, email, password, done) {
        var Admin = Provider;
        var generateHash = function(password) {

            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
         
        };
        Admin.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
         
            if (user)
         
            {
         
                return done(null, false, req.flash('signUpMessage','That email is already taken'));
   
            } else
         
            {
         
                var userPassword = generateHash(password);
                console.log(req.body.admin);
                if(req.body.admin === 'on'){
                    var administrater = true;
                }else {
                    var administrater = false;
                }
                var data =
         
                    {
                        email: email,
         
                        password: userPassword,
         
                        firstName: req.body.firstName,

                        lastName: req.body.lastName,

                        phone: req.body.phone,

                        experience: req.body.experience,

                        title: req.body.title,

                        admin: administrater,

                        notes: req.body.notes
         
         
                    };
         
         
                Admin.create(data).then(function(newAdmin, created) {
                    console.log(created);
                    if (!newAdmin) {
         
                        return done(null, false, req.flash('signUpMessage', "There was an error in creating admin!"));
         
                    }
         
                    if (newAdmin) {
                        
                        var AdminInfo = newAdmin;
                        delete AdminInfo.password;
                        return done(null, true, req.flash('newProviderSuccess',"Employee Account Created!"));
         
                    }
         
                });
         
            }
         
        });
    }
));


//LOCAL SIGNIN
passport.use('admin-local-signin', new LocalStrategy(

{

    // by default, local strategy uses username and password, we will override with email

    usernameField: 'email',

    passwordField: 'password',

    passReqToCallback: true // allows us to pass back the entire request to the callback

},


function(req, email, password, done) {

    var Admin = Provider;

    var isValidPassword = function(userpass, password) {

        return bCrypt.compareSync(password, userpass);

    }

    Admin.findOne({
        where: {
            email: email
        }
    }).then(function(admin) {

        if (!admin) {

            return done(null, false, req.flash('logInMessage', 'Email does not exist'));

        }

        if (!isValidPassword(admin.password, password)) {

            return done(null, false, req.flash('logInMessage','Incorrect password.'));

        }



        var AdminInfo = admin;
        delete AdminInfo.password;
        return done(null, AdminInfo);


    }).catch(function(err) {

        console.log("Error:", err);

        return done(null, false, req.flash('logInMessage','Something went wrong with your Signin'));

    });


}

));
// LOCAL UPDATE
passport.use('admin-local-update', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        console.log(req);

        var Admin = Provider;
        var isValidPassword = function(userpass, password) {

            return bCrypt.compareSync(password, userpass);
 
        };
        console.log(req.params)
        Admin.findOne({
            where: {
                id: req.params.userId
            }
        }).then(function(admin){
            console.log(admin);
            if (!admin) {

                return done(null, false, req.flash('settingsMessage', 'There was an error with your request. Please try again.'));

            }
 
            if (!isValidPassword(admin.password, password)) {
 
                return done(null, false, req.flash('settingsMessage','Incorrect password.'));

            }else {
                var data =
         
                {
                    email: email,
     
                    password: userPassword,
     
                    firstName: req.body.firstName,

                    lastName: req.body.lastName,

                    phone: req.body.phone,

                    experience: req.body.experience,

                    title: req.body.title,

                    admin: req.body.admin,

                    notes: req.body.notes
     
     
                };
                Admin.update(data,{
                    where: {id : req.params.userId}
                }).then(function(results){
                    Admin.findOne({
                        where: {
                            id: req.params.userId
                        }
                    }).then(function(admin){
                        var AdminInfo = admin;
                        delete AdminInfo.password;
                        return done(null, AdminInfo)
                    });
                    
                });
             };


            });
        }
    ));
}