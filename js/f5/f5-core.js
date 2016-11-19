(function (global) {
    'use strict';
    var NUMBER_OF_HOURS_A_DAY = 24;

    function range() {
        var start = 0,
            end = 0;

        if (arguments.length > 1) {
            start = arguments[0];
            end = arguments[1] + 1;
        }
        else if (arguments.length === 1) {
            end = arguments[0];
        }

        return new Array(end - start).fill(0).map(function(item, index){
            return start + index;
        });
     }

     function dates(count){
        var days = range(count);

        return days.map(function(item, index){
           var today = new Date(),
               value = today.setDate(today.getDate() + index);

           return new Date(value);
        });
     }

     function hours(date){
        var today = new Date();
        var currentHour = ((today.getDate() == date.getDate()) ? today.getHours() : 0);

        return range(currentHour, NUMBER_OF_HOURS_A_DAY - 1);
     }

     function template(templateString, source){
       return Object.keys(source).
                     reduce(function (result, key) {
                       var expr = new RegExp("{" + key + "}", 'gim');

                       templateString = templateString.replace(expr, source[key]);
                       
                       return templateString;
                     }, '');
     }

     global.F5 = global.F5 || {};

     global.F5.core = {dates:dates, hours:hours, template:template};
})(window);
