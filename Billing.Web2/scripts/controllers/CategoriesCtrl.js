(function(){

    application.controller("CategoriesCtrl", ['$scope', 'DataService',  function($scope, DataService) {
        $scope.showCategorie = false;
        ListCategories();

        $scope.edit = function(current){
            $scope.categorie = current;
            $scope.showCategorie = true;
        };

        $scope.save = function(){
            if($scope.categorie.id == 0)
                DataService.insert("categories", $scope.categorie, function(data){ ListCategories();} );
            else
                DataService.update("categories", $scope.categorie.id, $scope.categorie, function(data){ListCategories();});
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
            $scope.showCategorie = true;
        };

        function ListCategories(){
            DataService.list("categories", function(data){ $scope.categories = data});
        }
    }]);
}());