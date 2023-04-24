using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Panaderia.Models
{
    public class Productos_elaborados
    {
        [Key]
        public int id_producto_elaborado { get; set; }
        [Required]
        public string str_nombre_producto { get; set; }
        [ForeignKey("Recetas")]
        public int fk_recetas { get; set; }
        public virtual Recetas? Recetas { get; set; }
        public virtual Productos_Elaborados_Stock? Productos_Elaborados_Stock { get; set; }
        public virtual ICollection<Ordenes_produccion>? Ordenes_produccion { get; set; }
    }
}