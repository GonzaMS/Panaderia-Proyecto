using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    //api
    public class Arqueos
    {
        [Key]
        public int id_arqueo { get; set; }
        [Required]
        public int fk_detalle_cajas { get; set; }
        [Required]
        public int fk_cajero { get; set; }
        [Required]
        public string str_descripcion { get; set; }
        public virtual ICollection<Detalles_cajas>? Detalles_Cajas { get; set; }
        public virtual ICollection<Detalles_arqueos>? Detalles_Arqueos { get; set; }
    }
}
