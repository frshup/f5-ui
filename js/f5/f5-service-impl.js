function registerCustomer(requestJson,callback){
	return F5.http().post('registerCustomer',requestJson);
}

function getAllCities()
{


	F5.http().get('getAllCities').then(function(response){
	 var cityJson = JSON.stringify(response);


	return city = JSON.parse(cityJson);

	

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
	return F5.http().post('bookServices',reqJson);
}
