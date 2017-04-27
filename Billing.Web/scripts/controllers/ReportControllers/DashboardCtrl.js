(function () {
    application.controller("DashboardCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        var dashgdata;
        $scope.showDashboard=false;
        ListDashboard();

       function ListDashboard(){
            DataService.list("dashboard", function(data){ $scope.Dashboard = data});
            // var charData = [];
            // $scope.configChart = [];
            // for (var i = 0; i < $scope.Dashboard.regions.lenght; i++){
            //     console.log(i);
            // }
            // var chartData = [];
            //     $scope.configChart = [];

            //     for (var i = 0; i < $scope.Dashboard.regions.length; i++)  {
            //             chartData.push({
            //                 x: $scope.Dashboard.regions.label,
            //                 y: [$scope.Dashboard.regions.sales],
            //             })
            //             console.log(chartData);
            //         }

            //         $scope.data = {
            //             series: ["Regions"],
            //             data: chartData
            //         };
            //         $scope.configChart = {
            //                 tooltips: false,
            //                 labels: false,
            //                 mouseover: function () { },
            //                 mouseout: function () { },
            //                 click: function () { },
            //                 legend: {
            //                     display: false,
            //                     position: "right"
            //                 },
            //                 colors: ["red"]
            //         }
                    $scope.showDashboard=true;
        }
    }]);
}());
