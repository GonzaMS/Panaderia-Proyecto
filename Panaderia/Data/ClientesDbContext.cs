using Panaderia.Models;
using Microsoft.EntityFrameworkCore;

namespace Panaderia.Data
{
    public class ClientesDbContext : DbContext
    {
        public DbSet<Clientes> Clientes { get; set; }


        public ClientesDbContext(DbContextOptions<ClientesDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //clientes
            modelBuilder.Entity<Clientes>()
                    .HasKey(c => c.id_cliente);
            //Obteniendo el nombre de ese cliente
            modelBuilder.Entity<Clientes>()
                        .Property(c => c.str_nombre_cliente)
                        .HasColumnName("str_nombre_cliente");
            //Obteniendo el ruc de ese cliente
            modelBuilder.Entity<Clientes>()
                        .Property(c => c.str_ruc_cliente)
                        .HasColumnName("str_ruc_cliente");
            //Obteniendo el ci de ese cliente
            modelBuilder.Entity<Clientes>()
                        .Property(c => c.str_ci_cliente)
                        .HasColumnName("str_ci_cliente");

        }
    }
}