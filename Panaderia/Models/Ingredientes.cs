using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Panaderia.Models
{
    public class Ingredientes
    {
        [Key]
        public int id_ingrediente { get; set; }
        [Required]
        public int fk_marca_ingrediente { get; set; }
        public string str_nombre_ingrediente { get; set; }
        public virtual Marcas_Ingredientes? Marcas_Ingredientes { get; set; }
    }
}