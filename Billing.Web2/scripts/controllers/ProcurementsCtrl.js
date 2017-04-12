(function () {
    application.controller("ProcurementsCtrl", ['$scope', 'DataService', function ($scope, DataService) {

        $scope.showProcurement = false;
        ListProcurements();
        
        $scope.edit = function (currentProcurement) {
            $scope.procurement = currentProcurement;
            $scope.showProcurement = true;
        };

        $scope.save = function () {
            if ($scope.procurement.id == 0) DataService.insert("procurements", $scope.procurement, function (data) {
                ListProcurements();
            });
            else DataService.update("procurements", $scope.procurement.id, $scope.procurement, function (data) {
                ListProcurements();
            });
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
                    date: "2016-04-07T00:00:00",
                    document: "P/S",
                    quantity: 8,
                    price: 732,
                    total: 5124.25,
                    supplier: "SHOPPING THERAPY",
                    supplierId: 1,                
                    product: "Acer projector X127H",  
                    productId: 85,                  
                    shipping: 0
                   
            };
            $scope.showProcurement = true;
        };

        function ListProcurements() {
            DataService.list("procurements", function (data) {
                $scope.procurements = data
            });
        }
    }]);
}());