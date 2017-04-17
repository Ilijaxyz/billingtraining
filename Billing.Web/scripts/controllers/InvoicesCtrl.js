
(function () {
    application.controller("InvoicesCtrl", ['$scope', 'DataService', function ($scope, DataService) {

        $scope.modalShown = false;
        //$scope.showInvoice = false;
        ListInvoices(0);
        ListAgents();
        ListCustomers();
        ListShipper();
        
        $scope.edit = function (currentInvoice) {
            $scope.invoice = currentInvoice;
            $scope.modalShown = true;
            //$scope.showInvoice = true;
        };

        $scope.save = function () {
            if ($scope.invoice.id == 0) DataService.insert("invoices", $scope.invoice, function (data) {
                ListInvoices($scope.currentPage - 1); 
            });
            else DataService.update("invoices", $scope.invoice.id, $scope.invoice, function (data) {
                ListInvoices($scope.currentPage - 1);
            });
        };
        $scope.delete = function (currentInvoice) {
            console.log(currentInvoice.id);
            DataService.delete("invoices", currentInvoice.id, function (data) {
                ListInvoices();
            });
        };
        $scope.new = function () {
            console.log("adding invoice");
            $scope.invoice = {
                    id: 0,
                    invoiceNo: "",
                    date: new Date(),
                    shippedOn: new Date(),
                    statusId: 0,
                    subTotal: 0,
                    vat: 0,
                    vatAmount: 0,
                    total: 0,
                    shipperId: 0,                
                    agentId: 0,   
                    customerId: 0,                  
                    shipping: 0,
            };
             $scope.modalShown = true;
            //$scope.showInvoice = true;
        };

            function getTowns(name){
                DataService.list("towns/" + name, function(data){
                    $scope.towns = data;
                });
        }

        function ListInvoices(page) {
            DataService.list("invoices?page=" + page, function (data) {
                $scope.invoices = data.invoicesList;
                $scope.totalPages = data.totalPages;
                $scope.currentPage = data.currentPage + 1;
                $scope.pages = new Array($scope.totalPages);
                for (var i=0; i<$scope.totalPages; i++) $scope.pages[i] = i+1;
                    console.log($scope.currentPage);
            });
        }
        $scope.goto = function(page){
                ListInvoices(page-1);
            }
        function ListAgents(agentName){
            DataService.list("agents/" + name, function(data){$scope.agents = data});
        }

        function ListCustomers(customerName){
            DataService.list("customers/"+ name, function(data){$scope.customers = data});
        }

        function ListShipper(shipperName){
            DataService.list("shippers/"+ name, function(data){$scope.shippers = data});
        }
    }]);
}());

