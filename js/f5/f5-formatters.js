(function (global) {
    'use strict';
    
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr',
                  'May', 'Jun', 'Jul', 'Aug',
                  'Sep', 'Oct', 'Nov', 'Dec'];
    
    var DAY_SUFFIX = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th',
                      'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th',
                      'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th',
                      'st'];
    
    function dateFormat(date){
        var month = date.getMonth(),
            day = date.getDate(),
            year = date.getFullYear(),
            sMonth = MONTHS[month],
            sDay = day + DAY_SUFFIX[day-1],
            sYear = year.toString();                
            
        
        return [sDay, sMonth, sYear].join(' ');        
    }   
    
    function hourFormat(hour){               
        return [hour, '00'].join(':');        
    }        
         
    global.F5 = global.F5 || {};

    global.F5.format = {date:dateFormat, hour:hourFormat};     
})(window);
