using System.ComponentModel.DataAnnotations;

namespace Panaderia.Models
{
    public class Formas_pagos
    {

        [Key]
        public int id_forma_pago { get; set; }
        [Required]
        public String str_formas { get; set; }

    }
}