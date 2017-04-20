(function(){

    application.controller("SuppliersCtrl", ['$scope', 'DataService',  function($scope, DataService) {
        $scope.showSupplier = false;
        getTowns('');
        ListSuppliers(0);

        $scope.edit = function(current){
            $scope.supplier = current;
            $scope.showSupplier = true;
        };

        $scope.save = function(){
            if($scope.supplier.id == 0)
                DataService.insert("suppliers", $scope.supplier, function(data){ ListSuppliers($scope.currentPage - 1);} );
            else
                DataService.update("suppliers", $scope.supplier.id, $scope.supplier, function(data){ListSuppliers($scope.currentPage - 1);});
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

        // function ListSuppliers(){
        //     DataService.list("suppliers", function(data){ $scope.suppliers = data});
        // }

          //get Suppliers by page pagginaton
          function ListSuppliers(page) {
            DataService.list("suppliers?page=" + page, function (data) {
                $scope.suppliers = data.suppliersList;
                $scope.totalPages = data.totalPages;
                $scope.currentPage = data.currentPage + 1;
                $scope.pages = new Array($scope.totalPages);
                for (var i=0; i<$scope.totalPages; i++) $scope.pages[i] = i+1;
                    console.log($scope.currentPage);
            });
        }
        $scope.goto = function(page){
                ListSuppliers(page-1);
            }
    }]);

}());