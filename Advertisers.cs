using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Advertisers
    {
        public int Id { get; set; }
        public string ShortTitle { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public string Slug { get; set; }
        public int EntityTypeId { get; set; }
        public bool StatusId { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ZipCode { get; set; }
        public string Address { get; set; }
    }
}
