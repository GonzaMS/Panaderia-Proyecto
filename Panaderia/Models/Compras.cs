using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Compras
    {
        [Key]
        public int id_compra { get; set; }
        [Required]
        public int fk_proveedor { get; set; }
        public decimal dc_precio_total { get; set; }
        public System.DateTime date_compra { get; set; }
        public string str_numero_factura { get; set; }
        public virtual Proveedor? Proveedor { get; set; }
    }
}
