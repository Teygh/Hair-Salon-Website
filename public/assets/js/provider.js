

$(document).ready (function(){
    $("#addProvider").on("click", function (e) {
        e.preventDefault();
        console.log("I AM IN THE ADD PROVIDER MODAL HANDLEr");
        console.log("showing form" + $("#provider_form"));
        console.log("first name " + $("#inputFirstNameProvider").val());
        var newProvider = {
            firstName: $("#inputFirstNameProvider").val().trim(),
            lastName: $("#inputLastNameProvider").val().trim(),
            title: $("#inputTitleProvider").val().trim(),
            email: $("#inputEmailProvider").val().trim(),
            experience: $("#inputExperienceProvider").val().trim(),
            notes: $("#inputNotesProvider").val().trim(),
            password: $("#inputPasswordProvider").val().trim(),
            phone: $("#inputPhoneProvider").val().trim(),
            admin: $("#isAdminProvider"),
            photoLink: $("#inputPhotoLinkProvider").val().trim()

        };
        console.log(newProvider);
        $.ajax("/provider/register", {
            type: "POST",
            data: newProvider
        }).then(
            function (error) {
                console.log("Added provider " + newProvider.firstName + " " + newProvider.lastName);
                $("addProviderMsg").text("Added provider " + newProvider.firstName + " " + newProvider.lastName);
                // Reload the page to get the updated list
                location.reload();
                $("#provider_form").trigger("reset");
            }
        );

    });

});
