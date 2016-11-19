function wowInit(){
  new WOW().init();
}

function showBookNow(){
  F5.UIViews.templateView($('#book-now-container'), function(){
    $('#book-now-popup').modal('show');

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
  F5.UIViews.templateView($('#services-container'));
}

function init() {
  

  uiViewsInit();

  uiTemplateViewsInit();
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
	  .success(onSuccess)
    .error(onError)
}


function bookConfirmClicked(){


//Check user has provided all the value
	if(formValidation()){

		//Now prepare the request parameters
		//alert("break 1");

		var reqObj = new Object();

		reqObj.name = $("#inputName").val();
		reqObj.emailId = $("#inputEmail").val();
		reqObj.mobileNumber = $("#inputPhone").val();
		reqObj.dateOfBirth = "09102016";
		reqObj.password = $("#inputPhone").val();

		//Call the http request.
		registerCustomer(reqObj,callbackAddNewCustomer);
	}

}



function formValidation()
{

 //alert($("#bookingform").name.text());

// var filledData = JSON.stringify($('#bookingform').serializeArray())

 ///alert($('#bookingform').serializeArray());

	var name = $("#inputName").val();
	var email = $("#inputEmail").val();
	var phone = $("#inputPhone").val();
	var street = $("#inputAddress").val();

//alert(name);
	if(allLetter(name))
	{
		if(ValidateEmail(email))
		{
			if(allnumeric(phone))
			{

			}
		}
	}
	//alert(1);
	return true;
}





function bookformValidation()
{


	var name = $('#dLabel');
	//var email = $('#dLabel');

	var chkDate = $("#checkInDate option:selected").text();
	var chkTime = $("#checkInTime option:selected").text();


	var pkgVal = $('input[name="package"]:checked').val();
	var slotHr = $('input:radio[name="radio"]:checked').val();




	if(typeof pkgVal != 'undefined'){

		if(pkgVal < 1){

		alert('Please select any one of the package!');
		$("#package").focus();

		return false;
		}
	}else {

		alert('Please select any one of the package!');
		$("#package").focus();

		return false;
	}

	if(typeof slotHr != 'undefined'){

 		if(slotHr < 1){

			alert('Please select any one of the slot to stay!');
			$("#slothours").focus();

			return false;

		}
	}else {

		alert('Please select any one of the slot to stay!');
		$("#slothours").focus();

		return false;
	}

	return true;



}



function createBookingJson(custId){

	//Create a booking JSON

/*Accessing Server V1*/
	/*var reqObj = new Object();
	//var dateItems=$("#checkInDate option:selected").text().split('-');
		 //alert(dateItems);
 	//reqObj.bookingDate = dateItems[2]+'-'+dateItems[1]+'-'+dateItems[0];

 	 var selectedDate=$("#dates-view option:selected").val();

		var selDate = new Date(selectedDate);
 	var jsonDate = toJSONLocal(selDate);



 	//reqObj.bookingDate = dateItems[2]+'-'+dateItems[1]+'-'+dateItems[0];
 	reqObj.bookingDate = jsonDate;

  	reqObj.bookingTime = $("#hours-view option:selected").text();
  	reqObj.serviceCenterIds = "8001";
  	reqObj.packageId = "5001";
  	reqObj.packageCenterId = "7004";
  	reqObj.extendedHours = "0";
  	reqObj.customerId = custId;


	var reqJson = JSON.stringify(reqObj);

	//alert(reqJson);


	return reqObj;*/
	/* Accessing the server V2 */
	
	
	
	//Get the selected value of the package  and staying hour
	var pkgVal = $('input[name="package"]:checked').val();
	var slotHr = $('input:radio[name="radio"]:checked').val();
	
	var request = {
		bookingDate : toJSONLocal($("#dates-view").prop('selectedDate').value),
		bookingTime : $("#hours-view").prop('selectedHour').display,
        serviceCenterIds : "",
		noOfHours : slotHr,
		customerId: custId,
		packageCenterId : "7001",
		serviceIds : ""
	};    
	return request;

}


function callbackAddNewCustomer(custId){


	//alert(custId);

	callBookService(createBookingJson(custId));
}




function allLetter(name)
{
var letters = /^[A-Za-z]+$/;

if( typeof name == 'undefined'){

alert('Please provide your Name!');
name.focus();
return false;

}
if(name.match(letters))
{
return true;
}
else
{
alert('Username must have alphabet characters only');
name.focus();
return false;
}
}
function ValidateEmail(email)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


if( typeof email == 'undefined'){

alert('Please provide your email to reach you!');
name.focus();
return false;

}


if(email.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
email.focus();
return false;
}
}
function allnumeric(phone)
{
var letters = /^\d{10}$/;

if( typeof phone == 'undefined'){

alert('Please enter the Contact No!');
name.focus();
return false;

}
 
if(phone.match(letters))
{
return true;
}
else
{
alert('Phone number must have only 10 digits only');
phone.focus();
return false;
}
}
function alphanumeric(street)
{

//alert(street);
var letters = /^[0-9a-zA-Z]+$/;

if( typeof street == 'undefined'){

alert('Please enter the Address !');
street.focus();
return false;

}

if(street.match(letters))
{
return true;
}
else
{
alert('User address must have alphanumeric characters only');
street.focus();
return false;
}
}


function validatedate(date)
  {
  var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if(date.match(dateformat))
  {
  document.bookingform.date.focus();
  //Test which seperator is used '/' or '-'
  var opera1 = date.value.split('/');
  var opera2 = date.value.split('-');
  lopera1 = opera1.length;
  lopera2 = opera2.length;
  // Extract the string into month, date and year
  if (lopera1>1)
  {
  var pdate = date.value.split('/');
  }
  else if (lopera2>1)
  {
  var pdate = date.value.split('-');
  }
  var mm  = parseInt(pdate[0]);
  var dd = parseInt(pdate[1]);
  var yy = parseInt(pdate[2]);
  // Create list of days of a month [assume there is no leap year by default]
  var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (mm==1 || mm>2)
  {
  if (dd>ListofDays[mm-1])
  {
  alert('Invalid date format!');
  return false;
  }
  }
  if (mm==2)
  {
  var lyear = false;
  if ( (!(yy % 4) && yy % 100) || !(yy % 400))
  {
  lyear = true;
  }
  if ((lyear==false) && (dd>=29))
  {
  alert('Invalid date format!');
  return false;
  }
  if ((lyear==true) && (dd>29))
  {
  alert('Invalid date format!');
  return false;
  }
  }
  }
  else
  {
  alert("Invalid date format!");
  document.bookingform.date.focus();
  return false;
  }
  }
