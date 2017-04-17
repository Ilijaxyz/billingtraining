(function () {
    application.controller("ProcurementsCtrl",['$scope','$anchorScroll','DataService', function ($scope,$anchorScroll, DataService) {
        
        $scope.modalShown = false;
        //$scope.showProcurement = false;
        ListProcurements();
        ListProducts();
        ListSuppliers();
        
        $scope.edit = function (currentProcurement) {
            $scope.procurement = currentProcurement;
            $scope.modalShown = true;
            $anchorScroll();
            //$scope.showProcurement = true;
        };

        $scope.save = function () {
            if ($scope.procurement.id == 0) DataService.insert("procurements", $scope.procurement, function (data) {
                ListProcurements();
            });
            else DataService.update("procurements", $scope.procurement.id, $scope.procurement, function (data) {
                ListProcurements();
            });
            $scope.modalShown = false;
        };
        $scope.delete = function (currentProcurement) {
            console.log(currentProcurement.id);
            DataService.delete("procurements", currentProcurement.id, function (data) {
                ListProcurements();
            });
        };
        $scope.new = function () {
            console.log("adding procurement");
            $scope.procurement = {
                    id: 0,
                    date: new Date(),
                    document: 0,
                    quantity: 0,
                    price: 0,
                    total: 0,
                    supplier: 0,
					supplierId: 0,
                    product: 0,
					productId: 0,
                    shipping: 0
                   
            };
            $scope.modalShown = true;
            //$scope.showProcurement = true;
        };

        function ListProcurements() {
            DataService.list("procurements", function (data) {
                $scope.procurements = data
            });
        };
           function ListProducts() {
            DataService.list("products", function (data) {
                $scope.products = data
            });

        };
             function ListSuppliers() {
            DataService.list("suppliers", function (data) {
                $scope.suppliers = data
            });

        };
    }]);
}());