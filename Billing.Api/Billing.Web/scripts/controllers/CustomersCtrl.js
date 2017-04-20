(function(){

    application.controller("CustomersCtrl", ['$scope','$rootScope','$anchorScroll', 'DataService',  function($scope,$rootScope,$anchorScroll ,DataService) {
        
        $scope.modalShown = false;
        
        //$scope.showCustomer = false;
        ListCustomers(0);
        ListTowns();
        

        $scope.edit = function(currentCustomer){
            $scope.customer = currentCustomer;
            $scope.modalShown = true;
            $anchorScroll();
            //$scope.showCustomer = true;
        };

        $scope.save = function(){
            if($scope.customer.id == 0)
                DataService.insert("customers", $scope.customer, function(data){ ListCustomers($scope.currentPage - 1);} );
            else
                DataService.update("customers", $scope.customer.id, $scope.customer, function(data){ListCustomers($scope.currentPage - 1);});
            $scope.modalShown = false;
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
                    name: "",
                    address: "",
                    town: "",
            };
             document.getElementById('townsel').style.visibility = 'hidden';
                $scope.modalShown = true;
            
            //$scope.showCustomer = true;
        };

        //start paggination
                    function ListCustomers(page) {
            DataService.list("customers?page=" + page, function (data) {
                $scope.customers = data.customerList;
                $scope.totalPages = data.totalPages;
                $scope.currentPage = data.currentPage + 1;
                $scope.pages = new Array($scope.totalPages);
                for (var i=0; i<$scope.totalPages; i++) $scope.pages[i] = i+1;
                    console.log($scope.currentPage);
            });
        }
        $scope.goto = function(page){
                ListCustomers(page-1);
            }
        //end paggination

        // function ListCustomers(){
        //     DataService.list("customers", function(data){ $scope.customers = data});
        // } 
        
        function ListTowns(name){
                DataService.list("towns/" + name, function(data){
                    $scope.towns = data;
                });
            }
         $scope.textUp = function(keyEvent){
                if(keyEvent.key == "ArrowDown") document.getElementById('townsel').focus();
            };
            
         $scope.townSelected = function(keyEvent){
                if(keyEvent.key == "Enter") {
                    for(var i=0; i<$scope.towns.length; i++){
                        if($scope.towns[i].id === $scope.customer.townId){
                            $scope.customer.town = $scope.towns[i].name;
                            document.getElementById('townsel').style.visibility = 'hidden';
                            break;
                        }
                    }
                }
            };
          $scope.autocomplete = function(autoStr){
                if (autoStr.length >= 3){
                    ListTowns(autoStr);
                    document.getElementById('townsel').style.visibility = 'visible';
                    document.getElementById('townsel').size = 4;
                }
                else {
                    document.getElementById('townsel').style.visibility = 'hidden';
                }
            };
        
        
        
       
    }]);
}());
