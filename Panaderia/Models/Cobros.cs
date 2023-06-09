using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Cobros
    {
        [Key]
        public int id_cobro { get; set; }
        [Required]
        public int fk_forma_pago { get; set; }
        public float fl_monto_pago { get; set; }
        public string str_titular { get; set; }
        public string str_numero_celular { get; set; }
        public int int_num_cuenta_corriente { get; set; }
        [Required]
        public int fk_movimiento { get; set; }
        [Required]
        public int fk_factura { get; set; }
        public virtual Formas_pagos? Formas_pagos { get; set; }
        public virtual Movimientos? Movimientos { get; set; }
        public virtual Facturas? Facturas { get; set; }
    }
}
