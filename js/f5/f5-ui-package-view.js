(function (global) {
     var PACKAGES = [
                     {
                       name:'Lounge Sofa',
                       value: 4,
                       imgUrl:'4.png',
                       slots:[
                              {
                                value:2,
                                unit:'Hrs',
                                price:{value:400, currency:'INR'}
                              },
                              {
                                value:4,
                                unit:'Hrs',
                                price:{value:600, currency:'INR'}
                              },
                              {
                                value:6,
                                unit:'Hrs',
                                price:{value:800, currency:'INR'}
                              }]
                      },
                     {
                       name:'Lounge Recliner',
                       value: 3,
                       imgUrl:'3.png',
                       slots:[
                         {
                           value:2,
                           unit:'Hrs',
                           price:{value:500, currency:'INR'}
                         },
                         {
                           value:4,
                           unit:'Hrs',
                           price:{value:700, currency:'INR'}
                         },
                         {
                           value:6,
                           unit:'Hrs',
                           price:{value:900, currency:'INR'}
                         }]
                     },
                     {
                       name:'Bunker Bed',
                       value: 2,
                       imgUrl:'2.png',
                       slots:[
                         {
                           value:4,
                           unit:'Hrs',
                           price:{value:700, currency:'INR'}
                         },
                         {
                           value:6,
                           unit:'Hrs',
                           price:{value:950, currency:'INR'}
                         }
                       ]
                     },
                     {name:'Flat Bed',
                      value: 1,
                      imgUrl:'1.png',
                      slots:[
                        {
                          value:4,
                          unit:'Hrs',
                          price:{value:800, currency:'INR'}
                        }]
                     }];

     var state = {packages:[], selected:null,
                  container$:null, changeHandlers:[]};

     function packageView(container$){
         initialize(container$);
         bindChangeEvent();

         window.setTimeout(loadPackages);

         return {addOnChange:addChangeHandler};
      }

      function initialize(container$, changeHandler){
        state.container$ = container$;
      }

      function addChangeHandler(changeHandler){
        if (changeHandler !== null)
          state.changeHandlers.push(changeHandler);
      }

      function loadPackages(packages){
        state.packages = getPackages(null);

        appendToContainer(state.packages);

        selected(state.packages[0]);
      }

      function raiseOnChange(changeValue){
        state.changeHandlers.forEach(function(handler){
          console.log(changeValue);
          handler.call(null, changeValue);
        });
      }

      function packageRenderer(container$, packages){
        return packages.map(function(package){
          var templateHtml = '<option value="{value}">{name}</option>';
          return F5.core.template(templateHtml, package);
        });
      }

      function appendToContainer(packages){
        var markup = packageRenderer(state.container$, packages);

        state.container$.append(markup);
      }

      function selected(packageItem){
        console.log('selected', packageItem);

        state.selected = packageItem;
        state.container$.prop('selectedPackage', packageItem);

        raiseOnChange(packageItem);
      }

      function getPackages(locationID){
        return PACKAGES;
      }

      function bindChangeEvent(){
        state.container$.on('change', function(){
          var value = state.container$.val();

          var packages =
             state.packages.filter(function(pkg){
               return (pkg.value === +value);
           });

           selected(packages[0]);
        });
      }

      global.F5 = global.F5 || {};

      global.F5.UIViews.packageView = packageView;
      global.F5.UIViews.selectedPackage = state.selected;
})(window);
