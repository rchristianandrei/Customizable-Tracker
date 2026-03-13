using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Interfaces;
using server.Repos;
using server.Settings;

namespace server.Extensions;

public static class MongoDbExtension
{
    public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MongoDbSettings>(configuration.GetSection("MongoDB"));

        services.AddSingleton<IMongoClient>(sp =>
        {
            var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
            return new MongoClient(settings.ConnectionString);
        });

        services.AddScoped<IMongoDatabase>(sp =>
        {
            var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
            var client = sp.GetRequiredService<IMongoClient>();
            return client.GetDatabase(settings.DatabaseName);
        });

        services.AddScoped<ISubmittedTrackerRepo, SubmittedTrackerRepo>();
        services.AddScoped<ITrackerRepo, TrackerRepo>();

        return services;
    }
}
