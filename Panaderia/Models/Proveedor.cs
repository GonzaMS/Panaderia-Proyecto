using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Proveedor
    {
        [Key]
        //Autoincrementable
        public int id_proveedor { get; set; }
        [MaxLength(50)]
        public string str_nombre_proveedor { get; set; }
        [MaxLength(50)]
        public string str_direccion_proveedor { get; set; }
        [MaxLength(50)]
        public string str_ruc_proveedor { get; set; }
        [MaxLength(50)]
        public string str_correo_proveedor { get; set; }
        [MaxLength(50)]
        public string str_telefono_proveedor { get; set; }
    }
}