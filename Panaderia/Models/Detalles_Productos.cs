using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Detalles_Productos
    {
        [Key]
        public int id_detalle_producto { get; set; }
        [Required]
        public int fk_producto_elaborado { get; set; }
        public System.DateTime date_elaboracion { get; set; }
        public System.DateTime date_vencimiento { get; set; }
        public float dc_iva { get; set; }

        public virtual Productos_elaborados? Productos_Elaborados { get; set; }
    }
}