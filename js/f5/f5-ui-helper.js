//var cityList={};


 $(document).ready(function(){
     getAllCenters(callbackCenterList);



    });




function checkAvailability(reqObj1){

var reqObj = new Object();

 	reqObj.bookingDate =  "2016-09-20";
  	reqObj.bookingTime = "03:30";
  	reqObj.seriviceCenterIds = "8003";
  	reqObj.packageId = "5001";
  	reqObj.packageCenterId = "7001";
  	reqObj.extendedHours = "0";
  	reqObj.serviceIds = "";

	//alert(reqObj);
	//var reqJson = JSON.stringify(reqObj);

	//alert(reqJson);

	//Call the http request.
	getAvailability(reqObj1,callbackCheckAvaibility);


}

// $(document).on("click","#confirm",function addNewCustomer(){
//
//
// 	var reqObj = new Object();
//
//
//
// 	var reqJson = JSON.stringify(reqObj);
//
// 	alert(reqJson);
//
//
// 	var filledData = JSON.stringify($('form').serializeObject())
//
//
// 	alert(filledData);
//
// 	reqObj.name = filledData.name;
// 	reqObj.emailid = "xxx@gmail.com";
// 	reqObj.mobileNumber = "3234567890";
// 	reqObj.dateOfBirth = "09102016";
// 	//Call the http request.
// 	registerCustomer(reqJson,callbackAddNewCustomer);
//
// });



//All the function callbacks are here

function callbackCenterList(centerList){


//alert(centerList);

    for(i=0; i <= centerList.length ; i++ )
            {
                //var destDropDownMenu = "<li value="+ centerList[i].id +"><a href='#'>" + centerList[i].name + "</a><ul><li></li></ul></li>"
                //$(destDropDownMenu).appendTo("#destination");
            }


}

function callBookService(params){


 	//Call book http service
	bookServices(params,callbackBookService);

}

function callbackCheckAvaibility(isAvailable){

	//alert(isAvailable);
	if(isAvailable){

		//Show the form customer fill form
		showBookNow();
	}
	else{

		alert("Sorry, We are filled on , Please select different Time or Package!");

	}

}

//Helper

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};






function callbackBookService(status){


	alert("Thanks,We are waiting for your checkin! Kindly check your mail!");
	$("#checkAvailability").show();
	$("#confirm").hide();

}
