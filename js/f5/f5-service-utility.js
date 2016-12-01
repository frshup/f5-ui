(function(global) {

  function url(baseUrl, path){
    return baseUrl + path;
  }

  function get(baseUrl, service, params){
    return $.ajax({
      url:url(baseUrl, service),
      type: 'GET',
      data:JSON.stringify(params)
    }).promise();
  }

  function post(baseUrl, service, params){
    return $.ajax({
      url:url(baseUrl, service),
      contentType: 'application/json; charset=utf-8',
      type: 'POST',
      data: JSON.stringify(params)
    }).promise();
  }

  function http(params){
    var config = params || F5.Config;

    return {
      url:url.bind(null, config.BASE_SERVER),
      get:get.bind(null, config.BASE_SERVER),
      post:post.bind(null, config.BASE_SERVER)
    }
  }

  global.F5 = global.F5 || {};

  global.F5.http = http;

})(window);
