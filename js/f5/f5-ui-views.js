(function (global) {
    'use strict';


    function datesView($dates) {
        var dates,
            selectedDate,
            changeHandlers = [];

        $dates.on('change', function(){
            selectedDate = dates[$(this).find('option:selected').index()];

            $dates.prop('selectedDate', selectedDate);

            changeHandlers.forEach(function(handler){
               handler(selectedDate);
            });
        });

        function populate(){
            dates = F5.UI.dates(5);
            selectedDate = dates[0];

            //$dates.trigger('change')
            $dates.prop('selectedDate', selectedDate);
        }

        function render(){
            var options =
              dates.map(function (date) {
                var response =  '<option value="' + date.value.getDate() + '">';
                response += date.display;
                response += '</option>';

                return response;
             });

            $dates.empty();
            $dates.append(options);
        }

        function refresh(){
           populate();
           render();
        }

        function addOnChange(changeHandler){
            changeHandlers.push(changeHandler);

            if (typeof selectedDate !== 'undefined'){
                changeHandler(selectedDate);
            }
        }

        refresh();

        return {selected:selectedDate, refresh:refresh, addOnChange:addOnChange};
    }

    function hoursView($hours){
        var hours,
            selectedHour,
            changeHandlers = [];

        $hours.on('change', function(){
            selectedHour = hours[$(this).find('option:selected').index()];

            $hours.prop('selectedHour', selectedHour);

            changeHandlers.forEach(function(handler){
               handler(selectedHour);
            });
        });

        function populate(selectedDate){
            hours = F5.UI.hours(selectedDate);
            selectedHour = hours[0];

            $hours.prop('selectedHour', selectedHour);
        }

        function render(){
            var options =
            hours.map(function (hour) {
                var response =  '<option value="' + hour.value + '">';
                response += hour.display;
                response += '</option>';

                return response;
            });

            $hours.empty();
            $hours.append(options);
        }

        function refresh(selectedDate){
           populate(selectedDate.value);
           render();
        }

        return {selected:selectedHour, refresh:refresh};
    }

    function templateView(container$, callback){
      var url = container$.attr('data-template-url');

      if (url !== ''){
        container$.load(url, callback);
      }
    }


    global.F5 = global.F5 || {};

    global.F5.UIViews = {datesView:datesView,
                         hoursView:hoursView,
                         templateView:templateView};
})(window);
