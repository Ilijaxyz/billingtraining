using System.Collections.Generic;

namespace Billing.Api.Models
{
    public class TownModel
    {
        public TownModel()
        {
            Customers = new List<string>();
            Agents = new List<string>();
        }
        public int Id { get; set; }
        public string Name { get; set; }

        public string Zip { get; set; }

        public string Region { get; set; }

        public List<string> Customers { get; set; }
        public List<string> Agents { get; set; }
        public int RegionId { get; set; }

    }
}