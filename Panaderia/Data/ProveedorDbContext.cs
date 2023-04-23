using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

namespace Panaderia.Data;

public class ProveedorDbContext : DbContext
{

    public DbSet<Proveedor> Proveedores { get; set; }
    public ProveedorDbContext(DbContextOptions<ProveedorDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure your entities and relationships here.
        modelBuilder.Entity<Proveedor>()
                    .HasKey(p => p.id_proveedor);
        //Obteniendo el nombre de ese proveedor
        modelBuilder.Entity<Proveedor>()
                    .Property(p => p.str_nombre_proveedor)
                    .HasColumnName("str_nombre_proveedor");
        //Obteniendo la direccion de ese proveedor
        modelBuilder.Entity<Proveedor>()
                    .Property(p => p.str_direccion_proveedor)
                    .HasColumnName("str_direccion_proveedor");
        //Obteniendo el ruc de ese proveedor
        modelBuilder.Entity<Proveedor>()
                    .Property(p => p.str_ruc_proveedor)
                    .HasColumnName("str_ruc_proveedor");
        //Obteniendo el correo de ese proveedor
        modelBuilder.Entity<Proveedor>()
                    .Property(p => p.str_correo_proveedor)
                    .HasColumnName("str_correo_proveedor");
        //Obteniendo el telefono de ese proveedor
        modelBuilder.Entity<Proveedor>()
                    .Property(p => p.str_telefono_proveedor)
                    .HasColumnName("str_telefono_proveedor");
    }

}
