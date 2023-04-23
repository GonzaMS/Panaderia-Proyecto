using Panaderia.Models;
using Microsoft.EntityFrameworkCore;
namespace Panaderia.Data
{
    public class ProductosDbContext : DbContext
    {

        public DbSet<Productos_elaborados> Productos_elaborados { get; set; }

        public ProductosDbContext(DbContextOptions<ProductosDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Productos elaborados
            modelBuilder.Entity<Productos_elaborados>()
            .HasKey(p => p.id_producto_elaborado);
            modelBuilder.Entity<Productos_elaborados>()
            .Property(p => p.str_nombre_producto)
            .HasColumnName("str_nombre_producto");
            modelBuilder.Entity<Productos_elaborados>()
            .Property(p => p.fk_receta)
            .HasColumnName("fk_receta");

            //Un producto elaborado tiene una receta (relacion)
            modelBuilder.Entity<Productos_elaborados>()
            .HasOne(p => p.Recetas)
            .WithOne(r => r.Productos_elaborados)
            .HasForeignKey<Productos_elaborados>(p => p.fk_receta);
        }

    }
}