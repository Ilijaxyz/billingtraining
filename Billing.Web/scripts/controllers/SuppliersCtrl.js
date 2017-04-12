(function(){

    application.controller("SuppliersCtrl", ['$scope', 'DataService',  function($scope, DataService) {
        $scope.showSupplier = false;
        getTowns('');
        ListSuppliers();

        $scope.edit = function(current){
            $scope.supplier = current;
            $scope.showSupplier = true;
        };

        $scope.save = function(){
            if($scope.supplier.id == 0)
                DataService.insert("suppliers", $scope.supplier, function(data){ ListSuppliers();} );
            else
                DataService.update("suppliers", $scope.supplier.id, $scope.supplier, function(data){ListSuppliers();});
        };
        
        $scope.delete = function(current){
            console.log(current.id);
            DataService.delete("suppliers", current.id, function(){
                ListSuppliers();
            });
        };

        $scope.new = function(){
            $scope.supplier = {
                id: 0,
                name: "",
                address: "",
                town: ""
            };
            $scope.showSupplier = true;
        };

        function getTowns(name){
                DataService.list("towns/" + name, function(data){
                    $scope.towns = data;
                });
        }

        function ListSuppliers(){
            DataService.list("suppliers", function(data){ $scope.suppliers = data});
        }
    }]);

}());