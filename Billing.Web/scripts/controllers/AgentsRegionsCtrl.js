(function(){
    application.controller("AgentsRegionsCtrl", ['$scope', '$rootScope','$anchorScroll', 'DataService', function($scope, $rootScope,$anchorScroll, DataService){
        $scope.regionlist=[ "Banja Luka", "Bihac", "Doboj", "Mostar", "Sarajevo", "Trebinje", "Tuzla", "Zenica" ];
        $scope.save=function(){
            console.log("listing" + $scope.requestModel);
            DataService.insert("AgentsByRegion",$scope.request,
            function(data){
                $scope.CrossAgentRegion=data;
                          });        
        };
        
        //date-time picker --- start
        $scope.today = function() {
          $scope.procurement.date = new Date();
        };

        $scope.clear = function() {
          $scope.procurement.date = null;
        };

        $scope.inlineOptions = {
          customClass: getDayClass,
          minDate: new Date(),
          showWeeks: true
        };

        $scope.dateOptions = {
          dateDisabled: disabled,
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
          var date = data.date,
            mode = data.mode;
          return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
          $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
          $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open2 = function() {
          $scope.popup2.opened = true;
        };
        $scope.open3 = function() {
          $scope.popup3.opened = true;
        };
        $scope.setDate = function(year, month, day) {
          $scope.procurement.date = new Date(year, month, day);
        };

        $scope.format = 'dd-MMMM-yyyy'
        
        $scope.popup2 = {
          opened: false
        };
        $scope.popup3 = {
          opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
          {
            date: tomorrow,
            status: 'full'
          },
          {
            date: afterTomorrow,
            status: 'partially'
          }
        ];

        function getDayClass(data) {
          var date = data.date,
            mode = data.mode;
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
              var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

              if (dayToCheck === currentDay) {
                return $scope.events[i].status;
              }
            }
          }

          return '';
        }
      //date-time picker --- end
        
    }]);
}());