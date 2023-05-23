using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Panaderia.Data;
namespace Panaderia.Context;
public static class ServiceExtensions
{
    public static void ConfigurePanaderiaServices(this IServiceCollection services, string connectionString)
    {
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

        // Ingredientes DbContext
        services.AddDbContext<IngredientesDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
        //Stock DbContext
        services.AddDbContext<StocksDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );

        //Recetas DbContext
        services.AddDbContext<RecetasDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );

        //Productos DbContext
        services.AddDbContext<ProductosyMovimientosDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
        //Compras DbContext
        services.AddDbContext<ComprasDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
        //OrdenesDbContext
        services.AddDbContext<OrdenesDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
        // MovimientosDbContext
        // services.AddDbContext<MovimientosDbContext>(
        //     dbContextOptions => dbContextOptions
        //         .UseMySql(connectionString, serverVersion)
        //         .LogTo(Console.WriteLine, LogLevel.Information)
        //         .EnableSensitiveDataLogging()
        //         .EnableDetailedErrors()
        // );
        //ClientesDbContext
        services.AddDbContext<ClientesDbContext>(
            dbContextOptions => dbContextOptions
                .UseMySql(connectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
        );
        services.AddControllers();
    }
}
