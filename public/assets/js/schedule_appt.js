
// First user will select a service from dropdown menu
// Second user will select a stylist from dropdown menu
// Third user will select a day
// Fourth user will pick an appointment time
// READ READ READ READ READ READ READ READ READ READ READ READ
//
//  The idea behind all the logic in this js file is that the user should only be able to make 1 selection at a time. 
//    Since we have AJAX calls after every selection, inputs should be disabled until the ajax call is done and the information 
//  for the next input is there.
//  
//
$(document).ready(function () {
  var datesWorkedWithTimes;
  var scheduleID;
  var duration;
  $('.scheduleLabels').tooltip();
  $("#serviceChoice").on("change", function () {

    $('.appo-picker').detach();  
    $("#serviceChoice").prop('disabled', 'disabled');  
  

  
    $("#providerChoices").prop('disabled','disabled').empty().append("<option selected> Any </option>");

   

    $("#date").prop('disabled', 'disabled');
   

    $("#time-2").prop('disabled', 'disabled');
   

    $('.appo-picker').detach();


    var serviceChosen = $(this).val().trim();
    serviceChosen = encodeURIComponent(serviceChosen.trim())


    var providerQuery = `/api/retrieve/services/?all=no&specific=service&service_name=${serviceChosen}`; 



    $.ajax(providerQuery, {
      type: "GET",
      success: function (data) {
        console.log(data);
        duration = data[0].duration;
        for(var i = 0; i < data.length; i++){
          var option = $("<option>").attr({
            value : [
              data[i].ProviderId,
              data[i].Provider.firstName + " " + data[i].Provider.lastName
            ],

          }).html(data[i].Provider.firstName + " " + data[i].Provider.lastName);

          $("#providerChoices").append(option);
        };

        $("#providerChoices").prop('disabled', false);
        $("#serviceChoice").prop('disabled', false);
       
      },
      error: function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    });


  })

  $("#providerChoices").change(function(){
    $("#serviceChoice").prop('disabled', 'disabled');  
    


    $("#providerChoices").prop('disabled','disabled');

   

    $("#date").prop('disabled', 'disabled');
    
    $("#time-2").prop('disabled', 'disabled');
    

    $('.appo-picker').detach();   
    


  
    var provider_id = $('#providerChoices').val();

   console.log(provider_id[0]);

    var queryURL = '/api/retrieve/schedule/?orderBy=start&provider_id=' + provider_id[0];

    $.ajax(queryURL,{
      type: 'GET',
      success: function(data){
        $("#datepicker").prop('disabled',false);
        var datesWorked = [];
        datesWorkedWithTimes = [];

        for(var i = 0; i < data.length; i++){
         
          var dateStart = data[i].startTime;
          var dateE = data[i].endTime;
          var date = dateStart.split('T');
          var dateEnd = dateE.split('T');
          var schedule = {};
          datesWorked.push(date[0]);
          var key = date[0];

          schedule = {
            id : data[i].id,
            date : date[0],
            startTime : date[1],
            endTime : dateEnd[1]
          }
          datesWorkedWithTimes.push(schedule);

          

          
        }
        $("#serviceChoice").prop('disabled', false);  
        
    
        $("#providerChoices").prop('disabled',false);
    
        
    
        $("#datepicker").prop('disabled', false);
        

        $('#datepicker').datepicker({
          dateFormat: 'yy-mm-dd',
          beforeShowDay: function(dt){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', dt);
  
            return [ datesWorked.includes(string) ]
 
         }
          });



      }
    })

    
  })

  $('#datepicker').change(function(){
    $("#serviceChoice").prop('disabled', 'disabled'); 
    

    $("#providerChoices").prop('disabled','disabled');

    

    $("#datepicker").prop('disabled', 'disabled');
    

    $("#time-2").prop('disabled', 'disabled');
    

    $('.appo-picker').detach(); 
    var key = $(this).val().trim()


  
    var indexDate;
    for(var i = 0; i < datesWorkedWithTimes.length; i++){
      if(datesWorkedWithTimes[i].date === $(this).val().trim()){
        scheduleID = datesWorkedWithTimes[i].id;
        indexDate = i;
      }
    }

    indexDate = datesWorkedWithTimes[indexDate];

 

   


    $.ajax('/api/retrieve/schedule/?orderBy=start&schedule_id=' + scheduleID, {
      type: "GET",
      success: function(data){
        $("#serviceChoice").prop('disabled', false); 
       
    
        $("#providerChoices").prop('disabled',false);
    
        
        $("#datepicker").prop('disabled', false);
        
    
        $("#time-2").prop('disabled', false);
      

        var timesTaken = [];
        for(var i = 0; i < data[0].Appointments.length; i++){
          var startDateT = data[0].Appointments[i].appointStart;
          var startSplit = startDateT.split('T');
          var timeStart = startSplit[1];

          var convertedTime = timeStart.split(':');
          var convertedDuration = data[0].Appointments[i].duration.split(':');
          convertedDuration= convertedDuration[1] + ":" + convertedDuration[2];
          convertedTime = convertedTime[0] + ":" + convertedTime[1];
          var time = {
            start : convertedTime,
            duration : convertedDuration
          };

          timesTaken.push(time);


        }



        var disabledArr = [];


        var entry = indexDate.startTime.split(":");
        var leave = indexDate.endTime.split(':');

        for(var i = 0; i < timesTaken.length; i++){

          var thisAppArr = converter(timesTaken[i].start,timesTaken[i].duration);
          for (var j = 0; j < thisAppArr.length; j++){
            disabledArr.push(thisAppArr[j]);
          }
        };


        appPicker(disabledArr, Number(entry[0]), Number(leave[0]));

      }
    })
    })



 

  $("#submitAppointment").click(function(event){
    event.preventDefault();
    var provider = $('#providerChoices').val();
    provider = provider.split(',');
    console.log(provider[1]);
    $('#inputServiceChosen').val($('#serviceChoice').val());
    $('#inputServiceChosen').text($('#serviceChoice').text());
    $("#provId").val(provider[0]);
    $('#inputProviderChosen').val(provider[1]);
    $('#inputProviderChosen').text(provider[1]);
    console.log($('#datepicker').val());
    var date =$('#datepicker').val();
    $('#inputDayChosen').val(date);
    $('#inputDayChosen').text(date);
    $("#schedId").val(scheduleID);
    $('#inputTimeChosen').val($('#time-2').val());
    $('#inputTimeChosen').text($('#time-2').text());
 

    console.log($('#time-2').val())
    var t = $('#time-2').val();
    console.log(t.length);
    if(t.length === 8){
        var timeBuilder = date +","+ t
    }else {
      var timeBuilder = date +",0"+ t
    }
  
    console.log(timeBuilder);
    var theTime = moment(timeBuilder, "YYYY-MM-DD,hh:mm a").format("YYYY-MM-DDThh:mm:ss");  
    $("#startTime").val(theTime);
    $("#duration").val(duration);
    console.log(duration)

    // var clonedStart = moment(duration);
    var splitDur = duration.split(":");
    var splitStartT = t.split(":");
    var endHrs = parseInt(splitStartT[0]) + parseInt(splitDur[0]);
    var endMin = parseInt(splitStartT[1]) + parseInt(splitDur[1]);
    
    var endT;
    if(endMin === 60){
      endHrs++;
      endMin = "00";
    }
    if(endHrs.length ===1){
      endT = "0" + endHrs + ":";
    }else {
      endT = endHrs + ":";
    }
      
      endT += endMin + ":00"
    if(endT.length === 8){
        var ending = date +"T"+ endT
    }else {
      var ending = date +"T0"+ endT
    }
    var realEnding = moment(ending,"YYYY-MM-DD,hh:mm:ss").format("YYYY-MM-DDThh:mm:ss"); 
    $("#inputTheEnd").val(realEnding);
    console.log(realEnding);
    console.log(theTime);  
  });



  function appPicker(array, entry, leave){

    console.log(entry,leave);

  $.fn.appointmentPicker = function (options) {
    this.appointmentPicker = new AppointmentPicker(this[0], options);
    console.log(this);
    return this;
  };
  var $picker2 = $('#time-2').appointmentPicker({
    title: "Available Appointments",
    interval: 30,
    mode: '12h',
    static: true,
    minTime: 09,
    maxTime: 20,
    startTime: entry,
    endTime: leave,
    disabled: array,
    large: true
  });

  document.body.addEventListener('change.appo.picker', function (e) { 
    var time = e.time;

    

    $("#submitAppointment").prop('disabled', false);

  }, false);


  }



function converter(start, duration){
  // start format  hh:mm 
  // duration format hh:mm
  var arr = [start];

  var splitDur = duration.split(':');

  var count = 0;

  count += (parseInt(splitDur[0]) * 2);

  count += (parseInt(splitDur[0]) / 30);


  var newTime = start;
  for(var i = 1; i < Math.floor(count); i++){
 
    var startSplit = newTime.split(':');

    var newHr = startSplit[0];
    var newMin = (parseInt(startSplit[1]) + 30);
    if(newMin === 60){
      var newMin = '00';

      var newHr = (parseInt(startSplit[0]) + 1);

    }

    newTime = newHr + ":" + newMin;

    arr.push(newTime);
  }

  return arr;

}

  // $(document).on("click", ".dropdown-item", listServices);

});

