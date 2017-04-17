(function(){

    application.controller("CategoriesCtrl", ['$scope', 'DataService',  function($scope, DataService) {
        $scope.modalShown=false;
        //$scope.showCategorie = false;
        ListCategories();

        $scope.edit = function(current){
            $scope.categorie = current;
            $scope.modalShown=true;
            //$scope.showCategorie = true;
        };

        $scope.save = function(){
            if($scope.categorie.id == 0)
                DataService.insert("categories", $scope.categorie, function(data){ ListCategories();} );
            else
                DataService.update("categories", $scope.categorie.id, $scope.categorie, function(data){ListCategories();});
            $scope.modalShown=false;
        };

        $scope.delete = function(current){
            console.log(current.id);
            DataService.delete("categories", current.id, function(data){
                ListCategories();
            });
        };

        $scope.new = function(){
            $scope.categorie = {
                id: 0,
                name: "",
                product: 0
            };
            $scope.modalShown=true;
            //$scope.showCategorie = true;
        };

        function ListCategories(){
            DataService.list("categories", function(data){ $scope.categories = data});
        }
    }]);
}());