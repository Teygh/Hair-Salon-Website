module.exports = function(app,passport){


//***********************************CUSTOMER AUTHORIZATIONS********************************** */
    //Register
    app.post('/users/register', passport.authenticate('customer-local-signup',{
        failureRedirect: '/',
        failureFlash: true,

    }),
    function(req,res){
    
        res.redirect('/home/customer/' + req.user.id)
    });

    //Log in
    app.post('/users/login', passport.authenticate('customer-local-signin', {
        failureRedirect: '/',

        failureFlash: true
        
    }),
        function(req,res){
        console.log(req.user);

        res.redirect('/home/customer/' + req.user.id)
    });


    //Update Customer

    app.post('/update/:userType/:userId', passport.authenticate('customer-local-update',{
        failureRedirect: '/',
        failureFlash: true
    }),
        function(req,res){
            console.log("!!!!!!!!!!!!!!!")
            res.redirect('/home/customer/' + req.user.id)
        });



//*****************************************ADMIN/PROVIDER AUTHORIZATIONS******************************************* */


    //Creating a new provider

    app.post('/provider/register', passport.authenticate('admin-local-signup',{
        failureRedirect: '/',
        failureFlash: true,
        successFlash: true
    }),
    function(req,res){
        
        res.redirect('/');
    });

    app.post('/provider/login', passport.authenticate('admin-local-signin',{
        failureRedirect: '/',
        failureFlash: true,
        successFlash: true
    }),
    function(req,res){
    
        res.redirect('/')
    });

}

