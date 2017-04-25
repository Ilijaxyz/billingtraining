(function () {
    application.controller("SalesByCategoryCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showCategory = false;

        $scope.save = function () {
            console.log("listing" + $scope.requestModel);
            DataService.insert("SalesByCategory", $scope.requestData, function (data) {
                $scope.salesByCategoryData = data;
                $scope.showCategory = true;
            });
        }
    }]);
}());