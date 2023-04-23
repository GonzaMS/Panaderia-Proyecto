using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Productos_Elaborados_Stock
    {
        [Key]
        public int id_producto_stock { get; set; }
        [Required]
        public int fk_producto_elaborado { get; set; }
        public int fk_stock { get; set; }
        public decimal int_cantidad { get; set; }
    }
}