using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Detalles_efectivos
    {
        [Key]
        public int id_detalle_efectivos { get; set; }
        [Required]
        public int fk_billte { get; set; }
        public int int_cantidad_billete { get; set; }
        [Required]
        public int fk_detalle_arqueo { get; set; }
        public int int_total_billete { get; set; }
        public virtual Billetes? Billetes { get; set; }

    }
}