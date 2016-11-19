(function(global){
	//V1 server
    //var F5_BASE_SERVER = 'http://54.235.238.75:8080/frshup/';
	//V2 server
	var F5_BASE_SERVER = 'http://54.211.237.83:8080/frshup/';
	
   // var F5_BASE_SERVER = 'http://lowcost-env.bjzmdhx2nu.ap-south-1.elasticbeanstalk.com/'
    //var F5_BASE_SERVER = 'http://localhost:8080/';

    function configuration(){
      return {
        BASE_SERVER : F5_BASE_SERVER
      };
    }

    global.F5 = global.F5 || {};

    global.F5.Config = configuration();
})(window);
