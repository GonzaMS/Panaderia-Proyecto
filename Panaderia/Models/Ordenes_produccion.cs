using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Panaderia.Models
{
    public class Ordenes_produccion
    {
        [Key]
        public int id_orden { get; set; }
        [Required]
        public int int_cantidad { get; set; }
        public int fk_producto_elaborado { get; set; }
        public Boolean bool_estado_orden { get; set; }
        public virtual Productos_elaborados? Productos_elaborados { get; set; }
    }
}

