
(function () {
    application.controller("InvoicesCtrl", ['$scope', 'DataService', '$http', function ($scope, DataService, $http) {

        $scope.shownInvoices = false;
        $scope.showInvoices = false;
        ListInvoices(0);
        ListAgents();
        ListCustomers();
        ListShipper();
		$scope.states=[ "Canceled", "OrderCreated", "OrderConfirmed", "InvoiceCreated", "InvoiceSent", "InvoicePaid", "OnHold", "Ready", "Shipped" ];

         $scope.mailData = {
            invoiceId: 0,
            mailTo: ""
        };
        
        $scope.edit = function (currentInvoice) {
            $scope.invoice = currentInvoice;
            $scope.shownInvoices = true;
        };

        //invoice report function for info button
        $scope.info = function(invoice) {
            DataService.read("invoicereport", invoice.id, function(data) { $scope.invoicesData = data; })
            $scope.showInvoices = true;
        };
        //end of the invoice report function
     
        $scope.save = function () {
            if ($scope.invoice.id == 0) DataService.insert("invoices", $scope.invoice, function (data) {
                ListInvoices($scope.currentPage - 1); 
            });
            else DataService.update("invoices", $scope.invoice.id, $scope.invoice, function (data) {
                ListInvoices($scope.currentPage - 1);
            });
        };
        $scope.delete = function (currentInvoice) {
            DataService.delete("invoices", currentInvoice.id, function (data) {
                  swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this Invoice!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    },
                    function() {
                        ListInvoices();
                        swal("Deleted!", "Invoice has been deleted.", "success");
                    });
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
                    items: []
            };
             $scope.shownInvoices = true;
            //$scope.showInvoice = true;

            //adding items
            $scope.add = function(){
                $scope.invoice.items.push({
                    productId: 0,
                    quantity: 0,
                    price: 0,
                    invoiceId: 0,
                });
            };
                //remowing items
             $scope.remove = function (index) {
                    $scope.invoice.items.splice(index, 1);
                },
                //total caulculation
            $scope.total = function () {
                    var total = 0;
                    angular.forEach($scope.invoice.items, function (item) {
                        total += item.quantity * item.price;
                    })
                    return total;
                }
        };
         $scope.printDiv = function(divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=1000,height=1000');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css" /><link rel="stylesheet" type="text/css" href="styles/style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };

         $scope.saveAsPdf = function(id) {
            DataService.download(id);
        };

          $scope.send = function(invoiceId) {
            $scope.mailData.invoiceId=invoiceId;
            DataService.insert("invoices/mail", $scope.mailData, function(data) {
            swal("Success!", "Your email is sent to given address!", "success") 
            });
        }
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
            });
        }
        $scope.goto = function(page){
                ListInvoices(page-1);
            }
       	function ListAgents(agentName){
            DataService.list("agents/", function(data){$scope.agents = data});
        }

        function ListCustomers(customerName){
            DataService.list("customers/", function(data){$scope.customers = data});
        }

        function ListShipper(shipperName){
            DataService.list("shippers/"+ name, function(data){$scope.shippers = data});
        }
    }]);
}());

