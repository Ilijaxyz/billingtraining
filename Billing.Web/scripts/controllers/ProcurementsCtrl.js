(function(){
	var app = angular.module("Billing");
	var ProcurementsCtrl = function($scope,$http,DataService){
		$scope.showProcurements=false;
		ListProcurements();
        ListProducts();
        ListSuppliers();
		
		$scope.getProcurement = function (currentProcurement) {
            $scope.procurement = currentProcurement;
            $scope.showProcurements = true;
        };
		
		 $scope.save=function()
        {
            if($scope.procurement.id==0)
            {
                DataService.insert("procurements", $scope.procurement, function (data) {
                    ListProcurements();
                    $scope.showProcurements=false;
                });
            }
            else
            {
                DataService.update("procurements", $scope.procurement.id, $scope.procurement, function (data) {
                    ListProcurements();
                    $scope.showProcurements=false;
                });
            }
        };
		 $scope.deleteProcurement = function (currentProcurement) {

            DataService.delete("procurements", currentProcurement.id, function (data) {
                ListProcurements();
            });
            $scope.showProcurements = false;
        };

		$scope.new=function()
        {
            $scope.procurement=
                {

                    id: 0,
                    date: "",
                    document: "",
                    quantity: "",
					price: "",
					total:"",
                    supplier: "",
                    supplierId: "",
                    product: "",
                    productId: ""
                    
                };
            $scope.showProcurements=true;

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
	};
	app.controller("ProcurementsCtrl",ProcurementsCtrl);
}());