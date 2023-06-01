using Panaderia.Models;
using Microsoft.EntityFrameworkCore;


namespace Panaderia.Data
{
    public class CajasDbContext : DbContext
    {
        public DbSet<Cajas> Cajas { get; set; }
        public DbSet<Cajeros> Cajeros { get; set; }
        public DbSet<Detalles_cajas> Detalles_Cajas { get; set; }

        public CajasDbContext(DbContextOptions<CajasDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // cajas
            modelBuilder.Entity<Cajas>()
                        .HasKey(c => c.id_cajas);
            //Obteniendo el numero de caja
            modelBuilder.Entity<Cajas>()
                        .Property(c => c.int_numero_caja)
                        .HasColumnName("int_numero_caja");


            // cajeros
            modelBuilder.Entity<Cajeros>()
                        .HasKey(c => c.id_cajero);
            //Obteniendo el nombre del cajero
            modelBuilder.Entity<Cajeros>()
                        .Property(c => c.str_nombre_cajero)
                        .HasColumnName("str_nombre_cajero");

            //detalles_cajas
            modelBuilder.Entity<Detalles_cajas>()
                        .HasKey(d => d.id_detalle_caja);
            //Obteniendo el monto de la caja
            modelBuilder.Entity<Detalles_cajas>()
                        .Property(d => d.fl_monto_caja)
                        .HasColumnName("fl_monto_caja");
            //Obteniendo la fecha del dia
            modelBuilder.Entity<Detalles_cajas>()
                        .Property(d => d.date_fecha_del_dia)
                        .HasColumnName("date_fecha_del_dia");
            //Obteniendo la hora de entrada
            modelBuilder.Entity<Detalles_cajas>()
                        .Property(d => d.date_hora_entrada)
                        .HasColumnName("date_hora_entrada");
            //Obteniendo la hora de salida
            modelBuilder.Entity<Detalles_cajas>()
                        .Property(d => d.date_hora_salida)
                        .HasColumnName("date_hora_salida");


            //Relaciones entre tablas

            //una caja tiene varias detalles_cajas
            modelBuilder.Entity<Detalles_cajas>()
                        .HasOne<Cajas>(c => c.Cajas)
                        .WithMany(d => d.Detalles_cajas)
                        .HasForeignKey(c => c.fk_caja);
            //un detalle_caja tiene un caja
            modelBuilder.Entity<Cajas>()
                        .HasMany<Detalles_cajas>(d => d.Detalles_cajas)
                        .WithOne(c => c.Cajas)
                        .HasForeignKey(d => d.fk_caja);

            //un detalle_caja tiene un cajero
            modelBuilder.Entity<Cajeros>()
                        .HasMany<Detalles_cajas>(d => d.Detalles_cajas)
                        .WithOne(c => c.Cajeros)
                        .HasForeignKey(d => d.fk_cajero);

            //un cajero tiene varias detalles_cajas
            modelBuilder.Entity<Detalles_cajas>()
                        .HasOne<Cajeros>(c => c.Cajeros)
                        .WithMany(d => d.Detalles_cajas)
                        .HasForeignKey(c => c.fk_cajero);

        }
    }
}