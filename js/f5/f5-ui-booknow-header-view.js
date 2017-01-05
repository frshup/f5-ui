(function (global) {
    'use strict';

     function bookNowHeaderView(container$){
          var bookingDetails = getBookingDetails();
          var templateHtml = 'Book {slotValue} {slotUnits} {packageName} at {location} on {date}, {hour} for Rs.{priceValue}<sup>*</sup>/-.'
          var markup = F5.core.template(templateHtml, bookingDetails);

          console.log(markup);

          container$.empty();
          container$.html(markup);
      }

      function getBookingDetails(){
        var selectedSlot = $('#slots-view').prop('selectedSlot');
        var selectedPackage = $('#packages-view').prop('selectedPackage');
        var selectedDate = $('#dates-view').prop('selectedDate');
        var selectedHour = $('#hours-view').prop('selectedHour');
        var location = 'Gachibowli';

        return {
          location:'Gachibowli',
          slotValue:selectedSlot.value,
          slotUnits: selectedSlot.unit,
          packageName: selectedPackage.name,
          date: selectedDate.display,
          hour: selectedHour.display,
          priceValue: selectedSlot.price.value
        };
      }

      global.F5 = global.F5 || {};

      global.F5.UIViews.bookNowHeaderView = bookNowHeaderView;
})(window);
