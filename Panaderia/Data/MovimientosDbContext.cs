using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

namespace Panaderia.Data
{
    public class MovimientosDbContext : DbContext
    {
        public DbSet<Tipos_movimientos> Tipos_movimientos { get; set; }
        public DbSet<Movimiento_stock> Movimiento_stock { get; set; }

        public MovimientosDbContext(DbContextOptions<MovimientosDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Tipos de movimientos
            modelBuilder.Entity<Tipos_movimientos>()
                        .HasKey(t => t.id_tipo_movimiento);
            modelBuilder.Entity<Tipos_movimientos>()
                        .Property(t => t.int_movimiento)
                        .HasColumnName("int_movimiento");
            modelBuilder.Entity<Tipos_movimientos>()
                        .Property(t => t.str_tipo)
                        .HasColumnName("str_tipo");

            //Movimiento Stock
            modelBuilder.Entity<Movimiento_stock>()
                        .HasKey(m => m.id_transferencia_stock);
            modelBuilder.Entity<Movimiento_stock>()
                        .Property(m => m.fk_producto_elaborado)
                        .HasColumnName("fk_producto_elaborado");
            modelBuilder.Entity<Movimiento_stock>()
                        .Property(m => m.fk_stock)
                        .HasColumnName("fk_stock");
            modelBuilder.Entity<Movimiento_stock>()
                        .Property(m => m.fk_tipo_movimiento)
                        .HasColumnName("fk_tipo_movimiento");
            modelBuilder.Entity<Movimiento_stock>()
                        .Property(m => m.int_cantidad)
                        .HasColumnName("int_cantidad");
            modelBuilder.Entity<Movimiento_stock>()
                        .Property(m => m.date_fecha_ingreso)
                        .HasColumnName("date_fecha_ingreso");


            //Relaciones de entre las tablas
            //Un movimiento de stock puede tener un tipo de movimiento
            modelBuilder.Entity<Movimiento_stock>()
                        .HasOne(m => m.Tipos_movimientos)
                        .WithMany(t => t.Movimiento_stock)
                        .HasForeignKey(m => m.fk_tipo_movimiento);

            //Un movimiento de stock puede tener un producto elaborado
            modelBuilder.Entity<Movimiento_stock>()
                        .HasOne(m => m.Productos_elaborados)
                        .WithMany(p => p.Movimiento_stock)
                        .HasForeignKey(m => m.fk_producto_elaborado);

            //Un movimiento de stock puede tener un stock
            modelBuilder.Entity<Movimiento_stock>()
                        .HasOne(m => m.Stocks)
                        .WithMany(s => s.Movimiento_stock)
                        .HasForeignKey(m => m.fk_stock);

            //Tipos de movimientos
            modelBuilder.Entity<Tipos_movimientos>()
                        .HasData(
                            new Tipos_movimientos { id_tipo_movimiento = 1, int_movimiento = 1, str_tipo = "Entrada" },
                            new Tipos_movimientos { id_tipo_movimiento = 2, int_movimiento = 2, str_tipo = "Salida" }
                        );
            //Un tipos_movimientos puede tener muchos movimientos_stock
            modelBuilder.Entity<Tipos_movimientos>()
                        .HasMany(t => t.Movimiento_stock)
                        .WithOne(m => m.Tipos_movimientos)
                        .HasForeignKey(m => m.fk_tipo_movimiento);
        }
    }
}