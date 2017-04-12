(function(){

    application.controller("CustomersCtrl", ['$scope', 'DataService',  function($scope, DataService) {

        $scope.showCustomer = false;
        ListCustomers();
        

        $scope.edit = function(currentCustomer){
            $scope.customer = currentCustomer;
            $scope.showCustomer = true;
        };

        $scope.save = function(){
            if($scope.customer.id == 0)
                DataService.insert("customers", $scope.customer, function(data){ ListCustomers();} );
            else
                DataService.update("customers", $scope.customer.id, $scope.customer, function(data){ListCustomers();});
        };
        $scope.delete = function (currentCustomer) {
          console.log(currentCustomer.id);  
          DataService.delete("customers", currentCustomer.id, function (data) {
              ListCustomers(); 
          })
        };

        $scope.new = function(){
            console.log("adding customer");
            $scope.customer = {
                    id: 0,
                    name: "HROMES D.O.O.",
                    address: "Štrosmajerova 1",
                    town: "88000 MOSTAR",
                    townId: 521
            };
            $scope.showCustomer = true;
        };

        function ListCustomers(){
            DataService.list("customers", function(data){ $scope.customers = data});
        }
       
    }]);
}());
