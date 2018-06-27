$(function () {


    var offset = 120;

    $('#navPageLinks ul li a').click(function (event) {
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });


    $('#navPageLinks ul li a').click(function (event) {
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });



    // SignUp modeal open
    function signupModal() {
        event.preventDefault();
        $('#signupModal').modal('toggle');
        $('#signupModal').modal('show');
        console.log("hello");
    }


    // SignUp modeal open
    function signupModal() {
        event.preventDefault();
        $('#signupModal').modal('toggle');
        $('#signupModal').modal('show');
        console.log("hello");
    }


    // In order launch sign up modal place targer #placeholde
    var signupErr = $("#sign-up-error-msg").text().trim().length;
    var loginErr = $("#login-error-msg").text().trim().length;
    var settingsErr = $("#settings-error-msg").text().trim().length;
    var appointMsg = $("#appointmentSuccess").text().trim().length;

    console.log(signupErr);
    if (signupErr > 1) {
        $('#signupModal').modal('toggle');
        $('#signupModal').modal('show');
    };
    if (loginErr > 1) {
        $('#loginModal').modal('toggle');
        $('#loginModal').modal('show');
    };

    if (settingsErr > 1) {
        $("#userSettingsModal").modal('toggle');
        $("#userSettingsModal").modal('show');
    }


    if (settingsErr > 1) {
        $("#userSettingsModal").modal('toggle');
        $("#userSettingsModal").modal('show');
    }

    if(appointMsg > 1){
        $("#appointSuccess").modal('toggle');
        $("#appointSuccess").modal('show');
    }



    // Changes what's being displayed in settingsModal as the user changes the value of the input
    $('.settingsChild').keyup(function () {

  


        $(this).closest('.settingsParent').children('.childText').text($(this).val().trim());
    });




$("#addNewService").on("click", function(e){
    e.preventDefault();
    console.log(this);

    console.log("I AM IN THE ADD SERVICE MODAL HANDLER");

    var newService = {
        ProviderId: $("#providerPick").val(),
        category: $("#inputServiceCategory").val().trim(),
        service_name: $("#InputServiceName").val().trim(),
        description: $("#inputServiceDescription").val().trim(),
        duration: "00:30:00",
        price: $("#inputServicePrice").val().trim(),
        photolinks: $("#inputServicePhoto").val().trim()
        };
    console.log(newService);
    $.ajax("/api/service", {
        type: "POST",
        data: newService
    }).then(
        function (error) {
            if(error) console.log(error);

            console.log("Added service " + newService.service_name);
            //$("addServiceMsg").text("Added service " + newService.service_name);
            // Reload the page to get the updated list
            $("#service_form").trigger("reset");
            location.reload();
            
        }
    );

});


var providerQuery = `/api/retrieve/providers/?all=yes`;
console.log(providerQuery);
//Make the ajax call
$.ajax(providerQuery, {
    type: "GET",
    success: function (data) {

        for (var i = 0; i < data.length; i++) {
            var providerFirstName = data[i].provider.firstName;
            var providerID = data[i].provider.id;
            // console.log('Provider Data: ' + providerFirstName);
            console.log('Provider Data: ' + providerID);

            var providerList = $("#providerChoice2");
            var optionProvider = $("<option>");
            optionProvider.text(providerFirstName);
            optionProvider.val(providerID);
            providerList.append(optionProvider);
        }
    },
    error: function (request, error) {
        alert("Request: " + JSON.stringify(request));
    }
});

    var providerQuery = `/api/retrieve/providers/?all=yes`;
    console.log(providerQuery);
    //Make the ajax call
    $.ajax(providerQuery, {
        type: "GET",
        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                console.log(data);
                var providerFirstName = data[i].provider.firstName;
                var providerID = data[i].provider.id;
                // console.log('Provider Data: ' + providerFirstName);
                console.log('Provider Data: ' + providerID);

                var providerList = $("#providerChoice1");
                var optionProvider = $("<option>").attr({
                    value: providerID
                }).html(providerFirstName);
                providerList.append(optionProvider);

            }
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });




    $(".scheduleForm").on("submit", function (e) {
        e.preventDefault();

        console.log($("providerPick").val());

        var scheduleInput = {
            startTime: $("#inputStart").val().trim(),
            endTime: $("#inputEnd").val().trim(),
            ProviderId: $("#providerChoice1").val()
        }
        console.log(scheduleInput);


        $.ajax("/api/schedules", {
            type: "POST",
            data: scheduleInput
        }).then(
            function () {
                console.log(`Inserted new schedule item, Start Time: ${scheduleInput.startTime}, End Time: ${scheduleInput.endTime}, Provider Id: ${scheduleInput.ProviderId} `);
                // Reload the page to get the updated list
                location.reload();
            }
        );

    });
});

