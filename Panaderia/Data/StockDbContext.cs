using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

namespace Panaderia.Data;
public class StocksDbContext : DbContext
{
    public DbSet<Stocks> Stocks { get; set; }
    public DbSet<Productos_Elaborados_Stock> Productos_Elaborados_Stock { get; set; }
    public StocksDbContext(DbContextOptions<StocksDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Stocks
        modelBuilder.Entity<Stocks>()
        .HasKey(p => p.id_stock);
        //Obteniendo el nombre de ese stock
        modelBuilder.Entity<Stocks>()
        .Property(p => p.str_nombre_stock)
        .HasColumnName("str_nombre_stock");
        //Obteniendo la direccion de ese stock
        modelBuilder.Entity<Stocks>()
        .Property(p => p.str_direccion);


        //Productos_Elaborados_Stock
        modelBuilder.Entity<Productos_Elaborados_Stock>()
        .HasKey(p => p.id_producto_stock);
        //Obteniendo el id del producto elaborado
        modelBuilder.Entity<Productos_Elaborados_Stock>()
        .Property(p => p.fk_producto_elaborado)
        .HasColumnName("fk_producto_elaborado");
        //Obteniendo el id del stock
        modelBuilder.Entity<Productos_Elaborados_Stock>()
        .Property(p => p.fk_stock);
        //Obteniendo la cantidad de ese producto en ese stock
        modelBuilder.Entity<Productos_Elaborados_Stock>()
        .Property(p => p.int_cantidad);

    }
}