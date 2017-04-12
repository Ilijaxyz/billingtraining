
(function () {
    application.controller("InvoicesCtrl", ['$scope', 'DataService', function ($scope, DataService) {

        $scope.showInvoice = false;
        ListInvoices();
        
        $scope.edit = function (currentInvoice) {
            $scope.invoice = currentInvoice;
            $scope.showInvoice = true;
        };

        $scope.save = function () {
            if ($scope.invoice.id == 0) DataService.insert("invoices", $scope.invoice, function (data) {
                ListInvoices();
            });
            else DataService.update("invoices", $scope.invoice.id, $scope.invoice, function (data) {
                ListInvoices();
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
                    //status: "OrderCreated",
                    statusId: 0,
                    subTotal: 0,
                    vat: 0,
                    vatAmount: 0,
                    total: 0,
                    shipperId: 0,                
                    agentId: 0,   
                    customerId: 0,                  
                    shipping: 0,
                    //customer: "HROMES D.O.O.",
                    //agent: "Antonio Banderas",
                    //shipper: "BH Post"
            };
            $scope.showInvoice = true;
        };

            function getTowns(name){
                DataService.list("towns/" + name, function(data){
                    $scope.towns = data;
                });
        }

        function ListInvoices() {
            DataService.list("invoices", function (data) {
                $scope.invoices = data
            });
        }
    }]);
}());

