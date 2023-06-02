using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

namespace Panaderia.Data
{
    public class CobrosDbContext : DbContext
    {

        public DbSet<Formas_pagos> Formas_Pagos { get; set; }
        public DbSet<Billetes> Billetes { get; set; }
        public DbSet<Detalles_efectivos> Detalles_Efectivos { get; set; }

        public CobrosDbContext(DbContextOptions<CobrosDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Formas de pago
            modelBuilder.Entity<Formas_pagos>()
            .HasKey(p => p.id_forma_pago);
            modelBuilder.Entity<Formas_pagos>()
            .Property(p => p.str_formas)
            .HasColumnName("str_formas");

            //Billetes
            modelBuilder.Entity<Billetes>()
            .HasKey(p => p.id_billte);
            modelBuilder.Entity<Billetes>()
            .Property(p => p.str_numero_divisa)
            .HasColumnName("str_numero_divisa");
            modelBuilder.Entity<Billetes>()
            .Property(p => p.str_tamanho_efectivo);


            //Un detalle_efectivo tiene un billete
            modelBuilder.Entity<Detalles_efectivos>()
            .HasOne<Billetes>(s => s.Billetes)
            .WithMany(g => g.Detalles_efectivos)
            .HasForeignKey(s => s.fk_billte);

            //Un billete tiene muchos detalles_efectivos
            modelBuilder.Entity<Billetes>()
            .HasMany<Detalles_efectivos>(g => g.Detalles_efectivos)
            .WithOne(s => s.Billetes)
            .HasForeignKey(s => s.fk_billte);


        }

    }
}