(function () {
    application.controller("AgentsCtrl", ['$scope', 'DataService', function ($scope, DataService) {
        $scope.modalShown = false;
        //$scope.showAgent = false;
        ListAgents();
        $scope.edit = function (currentAgent) {
            $scope.agent = currentAgent;
            $scope.modalShown = true;
            //$scope.showAgent = true;
        };
        $scope.save = function () {
            if ($scope.agent.id == 0) DataService.insert("agents", $scope.agent, function (data) {
                ListAgents();
            });
            else DataService.update("agents", $scope.agent.id, $scope.agent, function (data) {
                ListAgents();
            });
            $scope.modalShown = false;
        };

        $scope.delete = function(currentAgent){
            console.log(currentAgent.id);
            DataService.delete("agents", currentAgent.id, function(data){
                ListAgents();
            });
        };
        $scope.new = function () {
            $scope.agent = {
                id: 0, 
                name: ""
            };
            $scope.modalShown = true;
            //$scope.showAgent = true;
        };

        function ListAgents() {
            DataService.list("agents", function (data) {
                $scope.agents = data
            });
        }
    }]);
}());