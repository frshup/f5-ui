(function (global) {
    'use strict';

     var state = {slots:[], selected:null, slot$:null};

     var selectedSlot = null;

     function getSelectedSlot(){
       return state.selected;
     }

     function selected(selectedSlotItem){
       console.log(selectedSlotItem);
       state.selected = selectedSlotItem;
        state.container$.prop('selectedSlot', state.selected);
    //raiseOnChange(changeHandlers, packageItem);
     }

     function updateSlots(slots){
       state.slots = slots;
     }

     function refresh(selectedPackage){
       console.log(selectedPackage);

       updateSlots(selectedPackage.slots);

       appendToContainer(state.slots);
     }

     function slotsView(container$){
          initialize(container$);

          return {refresh:refresh};
      }

      function initialize(container$){
        state.container$ = container$;

        bindChangeEvent();
      }

      function slotsRenderer(slots){
        return slots.map(function(slot){
          var templateHtml = '<option value="{value}">{value} {unit}</option>';
          return F5.core.template(templateHtml, slot);
        });
      }

      function appendToContainer(slots){
        var markup = slotsRenderer(slots);
        state.container$.empty();
        state.container$.append(markup);
          
        selected(slots[0]);
      }

      function bindChangeEvent(){
        state.container$.on('change', function(){
          var value = state.container$.val();

          var slots =
             state.slots.filter(function(slot){
               return (slot.value === +value);
           });

           selected(slots[0]);
        });
      }

      global.F5 = global.F5 || {};

      global.F5.UIViews.slotsView = slotsView;
      global.F5.UIViews.getSelectedSlot = getSelectedSlot;

})(window);
