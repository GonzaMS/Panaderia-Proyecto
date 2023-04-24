using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Panaderia.Models
{
    public class Productos_Elaborados_Stock
    {
        [Key]
        public int id_producto_stock { get; set; }
        [ForeignKey("Productos_elaborados")]
        public int fk_producto_elaborado { get; set; }
        public int fk_stock { get; set; }
        public decimal dc_cantidad { get; set; }
        public virtual Stocks? Stocks { get; set; }
        public virtual Productos_elaborados? Productos_elaborados { get; set; }

    }
}