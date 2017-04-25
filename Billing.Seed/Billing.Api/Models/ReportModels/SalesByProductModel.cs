using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models.ReportModels
{
    public class SalesByProductModel
    {
        public SalesByProductModel()
        {
            sales = new List<ProductSales>();
        }
        public string CategoryName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double CategoryTotal { get; set; }
        public double PrecentTotal { get; set; }
        public List<ProductSales> sales { get; set; }

    }
    public class ProductSales
    {
        public string ProductName { get; set; }
        public double ProductTotal { get; set; }
        public double ProductPrecent { get; set; }
        public double TotalPrecent { get; set; }
    } 
}