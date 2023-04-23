using Panaderia.Models;
using Microsoft.EntityFrameworkCore;
namespace Panaderia.Data
{
    public class ComprasDbContext : DbContext
    {

        public DbSet<Compras> Compras { get; set; }

        public ComprasDbContext(DbContextOptions<ComprasDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Compras
            modelBuilder.Entity<Compras>()
            .HasKey(p => p.id_compra);
            modelBuilder.Entity<Compras>()
            .Property(p => p.fk_proveedor)
            .HasColumnName("fk_proveedor");
            modelBuilder.Entity<Compras>()
            .Property(p => p.dc_precio_total)
            .HasColumnName("dc_precio_total");
            modelBuilder.Entity<Compras>()
            .Property(p => p.date_compra)
            .HasColumnName("date_compra");
            modelBuilder.Entity<Compras>()
            .Property(p => p.str_numero_factura)
            .HasColumnName("str_numero_factura");
        }

    }
}