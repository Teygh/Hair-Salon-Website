$(document).ready(function () {
    
    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000;  // 2 seconds


    $.ajax("/api/retrieve/services/?all=group", {
        type: "GET",
        success: function (data) {
            console.log('Data: ' + data);

            // Reload the page to get the updated list
            var table = $("<tbody>");
            data.forEach(element => {
                var service = element;
                var row = $("<tr>");
                var th = $("<th>").text(service.category);
                var tdService = $("<td>").text(service.description);
                var tdPrice = $("<td>").text(service.price);
                row.append(th).append(tdService).append(tdPrice);
                table.append(row);
            });
            $("#serviceTable").append(table);
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });


});

