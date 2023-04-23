using Microsoft.EntityFrameworkCore;
using Panaderia.Models;

namespace Panaderia.Data
{
    public class Marcas_IngredientesDbContext : DbContext
    {
        public Marcas_IngredientesDbContext(DbContextOptions<Marcas_IngredientesDbContext> options)
            : base(options)
        {
        }
        public DbSet<Marcas_Ingredientes> Marcas_Ingredientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entities and relationships here.
            modelBuilder.Entity<Marcas_Ingredientes>()
                        .HasKey(m => m.id_marca_ingrediente);
            //Obteniendo el nombre de ese proveedor
            modelBuilder.Entity<Marcas_Ingredientes>()
                        .Property(m => m.str_nombre_marca)
                        .HasColumnName("str_nombre_marca");
            //Una marca tiene varios ingredientes
            modelBuilder.Entity<Marcas_Ingredientes>()
                        .HasMany(m => m.Ingredientes)
                        .WithOne(i => i.Marcas_Ingredientes)
                        .HasForeignKey(i => i.fk_marca_ingrediente);
        }
    }
}
