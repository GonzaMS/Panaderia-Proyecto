using Microsoft.EntityFrameworkCore;
using Panaderia.Data;

namespace Panaderia.Main
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Creamos el contexto de la base de datos
            CreateHostBuilder(args).Build().Run();
        }

        // Configuramos el host
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Program>();
                });

        // Configuramos el servicio
        public Program(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // Configuramos el servicio
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // MySQL Connection String
            var connectionString = "server=localhost;user=root;password=12345;database=panaderia";

            // Version de MySql
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 32));

            // Proveedor DbContext
            services.AddDbContext<ProveedorDbContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(connectionString, serverVersion)
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors()
            );

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}