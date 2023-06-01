using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Clientes
    {
        [Key]
        //Autoincrementable
        public int id_cliente { get; set; }
        [Required]
        public string str_nombre_cliente { get; set; }
        public string str_ruc_cliente { get; set; }
        public string str_ci_cliente { get; set; }
    }
}