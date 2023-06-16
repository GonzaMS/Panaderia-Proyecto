using MySqlConnector;
using Panaderia.Context;
using Panaderia.DatabaseTriggers;

namespace Panaderia.Main
{
    public class Program
    {
        //Metodo Main
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

        // Configuramos el servicio de la base de datos
        public void ConfigureServices(IServiceCollection services)
        {
            // MySQL Connection String
            var connectionString = "Server=panaderia.mysql.database.azure.com;Database=panaderia;Port=3306;user=databasepanaderia;Password=Admin123$;SSL Mode=Required";
            //var connectionString = "server=localhost;user=gonza;password=12345678;database=panaderia";

            // Creamos la conexion a la base de datos
            var connection = new MySqlConnection(connectionString);

            // Configuramos el servicio de la base de datos
            services.ConfigurePanaderiaServices(connectionString);

            //Creamos los triggerss
            var insertDetalles_de_Compras = new Triggers(connection);
            if (insertDetalles_de_Compras.TriggerExists("TR_Insert_Compras") == false) insertDetalles_de_Compras.CreateTriggerInsertCompras();

            var fechaTrigger = new Triggers(connection);
            if (fechaTrigger.TriggerExists("TR_Date_Compras") == false) fechaTrigger.DateOnInsertCompras();

            // var UpdateTotalPrice = new Triggers(connection);
            // if (UpdateTotalPrice.TriggerExists("TR_Update_Total_Price") == false) UpdateTotalPrice.UpdateTotalPrice();

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

            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}