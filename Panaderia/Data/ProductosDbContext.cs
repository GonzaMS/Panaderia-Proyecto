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
            .Property(p => p.fk_recetas)
            .HasColumnName("fk_recetas");


            //Relaciones entre tablas

            //Un producto elaborado tiene una receta (relacion)
            modelBuilder.Entity<Productos_elaborados>()
            .HasOne(r => r.Recetas)
            .WithOne(p => p.Productos_elaborados)
            .HasForeignKey<Productos_elaborados>(p => p.fk_recetas);

            //Un producto elaborado tiene un producto elaborado stock (relacion)
            modelBuilder.Entity<Productos_elaborados>()
            .HasOne(p => p.Productos_Elaborados_Stock)
            .WithOne(p => p.Productos_elaborados)
            .HasForeignKey<Productos_Elaborados_Stock>(p => p.fk_producto_elaborado);

            //Un producto elaborado tiene muchas ordenes de produccion (relacion)
            modelBuilder.Entity<Productos_elaborados>()
            .HasMany(p => p.Ordenes_produccion)
            .WithOne(p => p.Productos_elaborados)
            .HasForeignKey(p => p.fk_producto_elaborado);
        }
    }
}