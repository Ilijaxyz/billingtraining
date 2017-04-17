(function () {
    application.controller("ShippersCtrl", ['$scope', 'DataService', function ($scope, DataService) {
        $scope.showShipper = false;
        getTowns('');
        ListShippers();
        
        $scope.edit = function (current) {
            $scope.shipper = current;
            $scope.showShipper = true;
        };
        $scope.save = function () {
            if ($scope.shipper.id == 0) DataService.insert("shippers", $scope.shipper, function (data) {
                ListShippers();
            });
            else DataService.update("shippers", $scope.shipper.id, $scope.shipper, function (data) {
                ListShippers();
            });
        };
        $scope.delete = function (current) {
            console.log(current.id);
            DataService.delete("shippers", current.id, function (data) {
                ListShippers();
            });
        };
        $scope.new = function () {
            $scope.shipper = {
                id: 0
                , name: ""
                , address: ""
                , town: ""
            };
            $scope.showShipper = true;
        };

        function getTowns(name){
                DataService.list("towns/" + name, function(data){
                    $scope.towns = data;
                });
        }

        function ListShippers() {
            DataService.list("shippers", function (data) {
                $scope.shippers = data
            });
        }
    }]);
}());