using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

//apii
namespace Panaderia.Data
{
    public class ArqueosDbContext : DbContext
    {
        public DbSet<Arqueos> Arqueos { get; set; }
        public DbSet<Detalles_arqueos> Detalles_Arqueos { get; set; }

        public ArqueosDbContext(DbContextOptions<ArqueosDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ingredientes
            modelBuilder.Entity<Arqueos>()
                        .HasKey(a => a.id_arqueo);
            //Obteniendo el nombre del ingrediente
            modelBuilder.Entity<Arqueos>()
                        .Property(a => a.str_descripcion)
                        .HasColumnName("str_descripcion");

            // Marca de ingredientes
            modelBuilder.Entity<Detalles_arqueos>()
                        .HasKey(d => d.id_detalle_arqueo);

            //Obteniendo el nombre de la marca
            modelBuilder.Entity<Detalles_arqueos>()
                        .Property(d => d.fl_total)
                        .HasColumnName("fl_total");

            //Relaciones entre tablas

            //un arqueo tiene varios detalles_arqueos
            modelBuilder.Entity<Detalles_arqueos>()
                        .HasOne<Arqueos>(a => a.Arqueos)
                        .WithMany(d => d.Detalles_Arqueos)
                        .HasForeignKey(a => a.fk_arqueo);
            //un detalle_arqueo tiene un arqueo
            modelBuilder.Entity<Arqueos>()
                        .HasMany<Detalles_arqueos>(d => d.Detalles_Arqueos)
                        .WithOne(a => a.Arqueos)
                        .HasForeignKey(d => d.fk_arqueo);
        }
    }
}