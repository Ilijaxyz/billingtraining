(function () {
    application.controller("SalesByRegionCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showRregion = false;

        $scope.save = function () {
            console.log("listing" + $scope.requestModel);
            DataService.insert("SalesByRegion", $scope.requestData, function (data) {
                $scope.salesByRegionData = data;
                $scope.showRegion = true;
            });
        }
    }]);
}());