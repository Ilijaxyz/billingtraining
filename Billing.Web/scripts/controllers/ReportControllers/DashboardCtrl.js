(function () {
    application.controller("DashboardCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showDashboard=false;
        ListDashboard();
        var regions=new Array(); //spremnik za podatke koje cemo prezentovati u ovom grafu
        var regionsName=new Array(); //spremnik za imena regiona
        function ListDashboard(){
            DataService.list("dashboard", function(data){ 
                $scope.Dashboard = data;
                angular.forEach(data.regions,function(value,key) { //uzimamo sve podatke iz region arraya
                    if(value!="$id") //u jasonu id moze praviti pobleme zato se isputuje da li je vrijednost nije jednaka 0
                    {
                        regions.push(value.sales); //punimo spremnik
                        regionsName.push(value.label); //punimo spremnik imenima regiona
                }
                });      
        });
                    $scope.showDashboard=true;
        }
         $scope.showRegion=function () { //funkcija za pokazivanje charta koja je vezana za button
            var ctx = document.getElementById("myChart"); //uzimanje elementa u kojem se nalazi chart
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: regionsName, //x osa graf koje podatke ce ispisati
                    datasets: [{
                        data: regions, //podatci koje dobija graf
                        label:"Region sales", // legenda
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    }]);
   



}());

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