namespace Panaderia.Models
{
    public class Billetes
    {
        public int id_billte { get; set; }
        public String str_numero_divisa { get; set; }
        public String str_tamanho_efectivo { get; set; }

        public virtual ICollection<Detalles_efectivos>? Detalles_efectivos { get; set; }
    }
}