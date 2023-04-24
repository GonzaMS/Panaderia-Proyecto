using Panaderia.Models;
using Microsoft.EntityFrameworkCore;


namespace Panaderia.Data
{
    public class MovimientosDbContext : DbContext
        {
        public DbSet<Movimientos_stock> Movimientos_Stocks { get; set; }
    
        public DbSet<Tipos_movimientos> Tipos_Movimientos { get; set; }

        public MovimientosDbContext(DbContextOptions<MovimientosDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Movimientos_stock
            modelBuilder.Entity<Movimientos_stock>()
            .HasKey(m => m.id_movimiento);
            modelBuilder.Entity<Movimientos_stock>()
                .Property(m => m.int_cantidad)
                .HasColumnName("int_cantidad");
            modelBuilder.Entity<Movimientos_stock>()
                .Property(m => m.date_fecha_ingreso)
                .HasColumnName("date_fecha_ingresa");
            modelBuilder.Entity<Movimientos_stock>()
                .Property(m => m.fk_producto_elaborado)
                .HasColumnName("fk_producto_elaborado");
            modelBuilder.Entity<Movimientos_stock>()
                .Property(m => m.fk_stock)
                .HasColumnName("fk_stock");
            modelBuilder.Entity<Movimientos_stock>()
                .Property(m => m.fk_tipo_movimiento)
                .HasColumnName("fk_tipo_movimiento");

            //tipos_movimientos
            modelBuilder.Entity<Tipos_movimientos>()
                .HasKey(tm => tm.id_tipo);
            modelBuilder.Entity<Tipos_movimientos>()
                .Property(tm => tm.int_movimiento)
                .HasColumnName("int_movimiento");
            modelBuilder.Entity<Tipos_movimientos>()
                .Property(tm => tm.str_tipo)
                .HasColumnName("str_tipo");
            
            
            // Configuración de las relaciones entre las tablas
            modelBuilder.Entity<Movimientos_stock>()
                .HasOne(ms => ms.Stocks)
                .WithMany(s => s.Movimientos_Stocks)
                .HasForeignKey(ms => ms.fk_stock);

            modelBuilder.Entity<Movimientos_stock>()
                .HasOne(ms => ms.Productos_Elaborados)
                .WithMany(pe => pe.Movimientos_Stock)
                .HasForeignKey(ms => ms.fk_producto_elaborado);

            modelBuilder.Entity<Movimientos_stock>()
                .HasOne(ms => ms.Tipos_Movimientos)
                .WithMany(tm => tm.Movimientos_Stocks)
                .HasForeignKey(ms => ms.fk_tipo_movimiento);

            modelBuilder.Entity<Tipos_movimientos>()
                .HasMany(tm => tm.Movimientos_Stocks)
                .WithOne(m => m.Tipos_Movimientos)
                .HasForeignKey(m => m.fk_tipo_movimiento);
        }
    }
}