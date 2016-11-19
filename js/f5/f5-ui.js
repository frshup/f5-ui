(function (global) {
    'use strict';
    
    function date(value){
        return {
         value:value,
         display:F5.format.date(value)
        }        
    }
    
    function hour(value){
        return {
         value:value,
         display:F5.format.hour(value)
        }        
    }
    
    function dates(count){
        return F5.core
                 .dates(count)
                 .map(date);
    }
    
    function hours(date){
        return F5.core.hours(date)
                      .map(hour);
    }
         
    global.F5 = global.F5 || {};

    global.F5.UI = {dates:dates, hours:hours};     
})(window);
