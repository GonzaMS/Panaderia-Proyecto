using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Detalles_de_compras
    {
        [Key]
        public int id_detalle_compra { get; set; }
        [Required]
        public int fk_compra { get; set; }
        public int fk_ingrediente { get; set; }
        public int fk_stock { get; set; }
        public float dc_precio_unidad { get; set; }
        public int int_cantidad { get; set; }
        public int int_iva { get; set; }

        public virtual Compras? Compras { get; set; }
        public virtual Ingredientes? Ingredientes { get; set; }
        public virtual Stocks? Stocks { get; set; }
    }
}