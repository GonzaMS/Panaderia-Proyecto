using Panaderia.Models;
using Microsoft.EntityFrameworkCore;


namespace Panaderia.Data
{
    public class IngredientesDbContext : DbContext
    {
        public DbSet<Ingredientes> Ingredientes { get; set; }

        public IngredientesDbContext(DbContextOptions<IngredientesDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entities and relationships here.
            modelBuilder.Entity<Ingredientes>()
                        .HasKey(i => i.id_ingrediente);
            //Obteniendo el nombre de ese proveedor
            modelBuilder.Entity<Ingredientes>()
                        .Property(i => i.str_nombre_ingrediente)
                        .HasColumnName("str_nombre_ingrediente");
            //Un ingrediente tiene una marca
            modelBuilder.Entity<Ingredientes>()
                        .HasOne(i => i.Marcas_Ingredientes)
                        .WithMany(m => m.Ingredientes)
                        .HasForeignKey(i => i.fk_marca_ingrediente);
        }
    }
}