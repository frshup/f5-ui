var TEMPLATE_CONTAINERS = ['#above-section', '#service-types-section', '#service-section',
                          '#footer-head-section', '#footer-bottom-section', '#service-additional-section'];

function wowInit(){
  new WOW().init();
}

function showBookNow(){
  F5.UIViews.templateView($('#book-now-container'), function(){

    $('#book-now-container').css('display','block');
    //$('#book-now-popup').css('display','block');
    $('#book-now-container').find(".close").on('click', function(){
      $('#book-now-container').css('display','none');
    })

    $('#confirm-book-now').submit(function(e){
      e.preventDefault();
      bookConfirmClicked();
    });

    window.onclick = function(event) {
        if ($(event.target).attr('id') === 'book-now-container') {
            $('#book-now-container').css('display','none');
        }
    }

    F5.UIViews.bookNowHeaderView($('#booknow-header-view'));
  });
}

function uiViewsInit(){
  var hoursView = F5.UIViews.hoursView($('#hours-view')),
      datesView = F5.UIViews.datesView($('#dates-view')),
      packagesView = F5.UIViews.packageView($('#packages-view')),
      slotsView = F5.UIViews.slotsView($('#slots-view'));

   datesView.addOnChange(hoursView.refresh);
   packagesView.addOnChange(slotsView.refresh);
}


function uiTemplateViewsInit(){
    TEMPLATE_CONTAINERS.forEach(function(selector){
      F5.UIViews.templateView($(selector));
    })

}

function init() {
  uiViewsInit();
  uiTemplateViewsInit();
  bindClick();
}

function bindClick(){
  $('#form-reservation').submit(function(e){
    e.preventDefault();
    bookNowClicked();
  });
}




$("#confirmForm").submit(function(e) {
    e.preventDefault();
});

function dismissConfrim(){
		$("#checkAvailability").show();
	  $("#confirm").hide();
}

function displayConfirmForm(){
	$("#checkAvailability").hide();
	$("#confirm").show();

}

function bookNowClicked(){

  function onSuccess(response){
    if (!response) alert("Error in processing request!!!");

    showBookNow();
  }

  function onError(e){
     alert("An error occurred " + JSON.stringify(e));
  }

  var numberOfHours = $('#slots-view').prop('selectedSlot');

  var request = {
		bookingDate : toJSONLocal($("#dates-view").prop('selectedDate').value),
		bookingTime : $("#hours-view").prop('selectedHour').display,
    serviceCenterIds : "",
		packageCenterId : "7001",
		extendedHours : "0",
		serviceIds : "",
   	noOfHours: numberOfHours.value
	};

  F5.http()
    .post('getAvailability', request)
	  .then(onSuccess)
    .fail(onError);
}

function displayConfirmation(bookingId){
  var bookid = bookingId;
   document.getElementById('book').innerHTML= bookid;


  $("#checkAvailability").show();
	$("#confirm").hide();
}

function bookConfirmClicked(){


		var reqObj = new Object();

		reqObj.name = $("#inputName").val();
		reqObj.emailId = $("#inputEmail").val();
		reqObj.mobileNumber = $("#inputPhone").val();
		reqObj.dateOfBirth = "09102016";
		reqObj.password = $("#inputPhone").val();

		//Call the http request.
		registerCustomer(reqObj).then(function(response){
      return bookingRequest(response.id);
    }).then(function(customerRequest){
        return createNewCustomer(customerRequest);
    }).then(function(customerResponse){
         displayConfirmation(customerResponse.bookingId);
    }).fail(function(e){
        alert('An error occurred ' + JSON.stringify(e));
    });

}

function bookingRequest(custId){

	//Get the selected value of the package  and staying hour
  var numberOfHours = $('#slots-view').prop('selectedSlot');

  var request = {
		bookingDate : toJSONLocal($("#dates-view").prop('selectedDate').value),
		bookingTime : $("#hours-view").prop('selectedHour').display,
    serviceCenterIds : "",
		packageCenterId : "7001",
		extendedHours : "0",
    customerId: custId,
		serviceIds : "",
   	noOfHours: numberOfHours.value
	};

	return request;

}

function createNewCustomer(customerRequest){
	return bookServices(customerRequest);
}