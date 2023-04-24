using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Movimientos_stock
    {
        [Key]
        public int id_movimiento { get; set; }
        [Required]
        public int fk_producto_elaborado { get; set; }
        public int fk_stock { get; set; }
        public int fk_tipo_movimiento { get; set; }
        public int int_cantidad { get; set; }
        public System.DateTime date_fecha_ingreso { get; set; }
        
        public virtual Productos_elaborados ? Productos_Elaborados { get; set; }

        public virtual Stocks ? Stocks { get; set; }
        public virtual Tipos_movimientos ? Tipos_Movimientos { get; set; }
    }
}
