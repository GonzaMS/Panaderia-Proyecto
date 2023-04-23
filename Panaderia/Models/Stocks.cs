using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Stocks
    {
        [Key]
        public int id_stock { get; set; }
        [Required]
        public string str_nombre_stock { get; set; }
        public string str_direccion { get; set; }
    }
}