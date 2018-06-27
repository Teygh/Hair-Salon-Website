$(document).ready(function (){
/*
    $.ajax("/api/retrieve/providers", {
        type: "GET",
        success: function (data) {
            console.log('Data: ' + data);

            // Reload the page to get the updated list
            
            for (var i = 0; i < 2; i++)
            {
            
                var provider=data[i].provider;
                console.log(provider);
                var name = `${provider.firstName} ${provider.lastName}`;
                var title = provider.title;
                var bio = provider.notes;
                var email = provider.email;
                var phone = provider.phone;
                var pic = provider.photoLink;

                console.log(`Provider ${i}: ${name} ${title}  ${email} ${phone} ${pic} ${bio}`);
                var proNumb = i+1;
                $("#stylist" + proNumb + "_name").text(name);
                $("#stylist" + proNumb + "_title").text(title);
                $("#stylist" + proNumb + "_bio").text(bio);
                $("#stylist" + proNumb + "_email").text(email);
                $("#stylist" + proNumb + "_phone").text(phone);

                $("#stylist" + proNumb + "_pic").attr({'src': pic });
            }
            
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
    */
});