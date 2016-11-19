function registerCustomer(requestJson,callback){

	//alert(requestJson);
	F5.http().post('registerCustomer',requestJson)
	//success call back
	.then(function(responseMsg){


	var custId = JSON.stringify(responseMsg);

	//alert(responseMsg.id);

		callback(responseMsg.id);

	});
	//  failure callback;
	//.fail(function(res){

		//alert(JSON.stringify(res.responseText.message));

	//});
}

function getAllCities()
{

//var myObject = new Object();
//myObject.name = "John";
//myObject.age = 12;
//myObject.pets = ["cat", "dog"];

//var myString = JSON.stringify(myObject);

//alert(myString);

	//function myresponse(response){

	//alert(response);

	//}

//	var json = myString,
  //  obj = JSON.parse(json);

//alert(obj.name);

	F5.http().get('getAllCities').then(function(response){
	 var cityJson = JSON.stringify(response);


	return city = JSON.parse(cityJson);

	//for(i=0;i<city.length;i++){

	 //alert(city[i].id);
	 //alert(city[i].name);
	 //}

	});





	//alert('break2');




}

function getAllCenters(callbackCenterList)
{



	F5.http().get('getAllCenters').then(function(response){
	 var cityJson = JSON.stringify(response);

	 callbackCenterList(JSON.parse(cityJson));
	//alert(cityJson);
	//return city = JSON.parse(cityJson);





	});

}

function getAllCentersByCityId(request)
{

   F5.http().post('getAllCentersAllCityId',request).then(function(response){

   var json = JSON.stringify(response);


	return centerList = JSON.parse(json);


   });
}

function getPackagesAndServicesByCenterId()
{
	var request={
		"centerid":"4002"
	}

F5.http().get('getPackagesAndServicesByCityId',request)
}

function getAvailability(request,callback)
{

	F5.http().post('getAvailability',request).then(function(responseMsg){

	//alert(responseMsg);

	//get back to the callee
	callback(responseMsg);

	});
}

function bookServices(reqJson, callback)
{
	var request={
 		  "bookingDate":"2016-09-20",
		  "bookingTime":"03:30",
		  "seriviceCenterIds":"",
		  "packageId":"5001",
		  "packageCenterId":"7004",
		  "customerId":"1101",
		  "extendedHours":"1"
		}

		F5.http().post('bookServices',reqJson).then(function(response){

		var json = JSON.stringify(response);
		callback(json);



		});
	}
