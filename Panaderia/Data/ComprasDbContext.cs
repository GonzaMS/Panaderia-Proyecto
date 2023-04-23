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
            // Configure your entities and relationships here.
            modelBuilder.Entity<Compras>()
                        .HasKey(c => c.id_compra);
            //Obteniendo el nombre de ese proveedor
            modelBuilder.Entity<Compras>()
                        .Property(c => c.dc_precio_total)
                        .HasColumnName("dc_precio_total");
            //Obteniendo la fecha de esa compra
            modelBuilder.Entity<Compras>()
                        .Property(c => c.date_compra)
                        .HasColumnName("date_compra");
            //Obteniendo el numero de factura de esa compra
            modelBuilder.Entity<Compras>()
                        .Property(c => c.str_numero_factura)
                        .HasColumnName("str_numero_factura");

            //una compra tiene un proveedor
            modelBuilder.Entity<Compras>()
                        .HasOne(p => p.Proveedor)
                        .WithMany(c => c.Compras)
                        .HasForeignKey(c => c.fk_proveedor);
        }
    }
}