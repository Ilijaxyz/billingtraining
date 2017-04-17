(function(){
    var app = angular.module("Billing");

    var ProductsCtrl =  function ($scope, $http, DataService) {

        $scope.showProducts=false;
        ListProducts();
        ListCategories();
        //get all products
        $scope.getProduct = function (currentProduct) {
            $scope.product = currentProduct;
            $scope.showProducts = true;
        };
        //update or create products
        $scope.save=function()
        {
            if($scope.product.id==0)
            {
                DataService.insert("products", $scope.product, function (data) {
                    ListProducts();
                    $scope.showProducts=false;
                });
            }
            else
            {
                DataService.update("products", $scope.product.id, $scope.product, function (data) {
                    ListProducts();
                    $scope.showProducts=false;
                });
            }
        };
        //delete product

        $scope.deleteProduct = function (currentProduct) {
            DataService.delete("products", currentProduct.id, function (data) {
                ListProducts();
            });
            $scope.showProducts = false;
        };
        //create new
        $scope.new=function()
        {
            $scope.product=
                {
                    id: 0,
                    name: "",
                    unit: "",
                    price: "",
                    category: "",
                    categoryId: "",
                    input: "",
                    output: "",
                    inventory: ""
                };
            $scope.showProducts=true;
        };
        //get list categories from the database
        function ListProducts() {
            DataService.list("products", function (data) {
                $scope.products = data
            });

        };
        function ListCategories() {
            DataService.list("categories", function (data) {
                $scope.categories = data
            });

        };
    };
    app.controller("ProductsCtrl",ProductsCtrl);
}());