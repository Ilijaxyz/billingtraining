(function () {
    application.controller("StockCtrl", ['$scope', 'DataService', function ($scope, DataService) {
        $scope.showStock = false;
        ListStocks();
        ListProducts('');
        
        $scope.getStock = function(currentStock){
            $scope.stock = currentStock;
            $scope.showStock = true;
            //console.log(stock);
        };
         function ListStocks() {
             DataService.list("stock", function (data) {$scope.stock = data
                //console.log(data);
             });};

             function ListProducts(){
             DataService.list("products", function(data){ $scope.products = data 
                 //console.log(data);
                });};     
    }]);
}());



// (function(){

//     var app = angular.module("Billing");

//     var StockCtrl = function($scope, $http, DataService) {

//         $scope.showStock = false;
//         ListStocks(0);

//         $scope.getStock = function(currentStock){
//             $scope.stock = currentStock;
//             $scope.showStock = true;
//         };

 // //get stocks by page pagginaton
 //           function ListStocks(page) {
 //             DataService.list("stock?page=" + page, function (data) {
 //                 $scope.stock = data.stocksList;
 //                 $scope.totalPages = data.totalPages;
 //                 $scope.currentPage = data.currentPage + 1;
 //                 $scope.pages = new Array($scope.totalPages);
 //                 for (var i=0; i<$scope.totalPages; i++) $scope.pages[i] = i+1;
 //                     console.log($scope.currentPage);
 //             });
 //         }
 //         $scope.goto = function(page){
 //                 ListStocks(page-1);
 //             }
 //             //end of paggination

//         // function ListStocks(){
//         //     DataService.list("stock", function(data){ $scope.stock = data});
//         // };
        
//         function ListProducts(){
//             DataService.list("products", function(data){ $scope.products = data});
        
//         }
//     };

//     app.controller("StockCtrl", StockCtrl);

// }());
