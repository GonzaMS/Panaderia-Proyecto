using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Tipos_movimientos
    {
        [Key]
        public int id_tipo_movimiento { get; set; }
        [Required]
        public int int_movimiento { get; set; }
        public string str_tipo { get; set; }
        
        public virtual ICollection<Movimientos_stock>? Movimientos_Stocks { get; set; }
    }
}
