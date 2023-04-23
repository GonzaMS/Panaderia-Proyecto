using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Productos_elaborados
    {
        [Key]
        public int id_producto_elaborado { get; set; }
        [Required]
        public string str_nombre_producto { get; set; }
        public int fk_receta { get; set; }

        public virtual Recetas? Recetas { get; set; }
    }
}