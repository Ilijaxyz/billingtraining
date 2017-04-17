(function(){

    var app = angular.module("Billing");

    var StockCtrl = function($scope, $http, DataService) {

        $scope.showStock = false;
        ListStocks();

        $scope.getStock = function(currentStock){
            $scope.stock = currentStock;
            $scope.showStock = true;
        };


        function ListStocks(){
            DataService.list("stock", function(data){ $scope.stock = data});
        };
        
        function ListProducts(){
            DataService.list("products", function(data){ $scope.products = data});
        
        }
    };

    app.controller("StockCtrl", StockCtrl);

}());
