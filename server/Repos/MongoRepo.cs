using MongoDB.Bson;
using MongoDB.Driver;
using server.Interfaces;
using System.Linq.Expressions;

namespace server.Repos;

public abstract class MongoRepo<T>(IMongoDatabase database, string collectionName) : IMongoRepo<T> where T : IEntity
{
    protected readonly IMongoCollection<T> entities = database.GetCollection<T>(collectionName);

    public async Task<IEnumerable<T>> GetAll()
    {
        return await (await entities.FindAsync(_ => true)).ToListAsync();
    }

    public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter)
    {
        return await (await entities.FindAsync(filter)).ToListAsync();
    }

    public async Task<IEnumerable<T>> GetAll(FilterDefinition<T> filter)
    {
        return await (await entities.FindAsync(filter)).ToListAsync();
    }

    public async Task<T?> GetById(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId)) return default;
        return await (await entities.FindAsync(T => T.Id == id)).FirstOrDefaultAsync();
    }

    public async Task<T> GetOne(Expression<Func<T, bool>> filter)
    {
        return await (await entities.FindAsync(filter)).FirstOrDefaultAsync();
    }

    public async Task Create(T entity)
    {
        await entities.InsertOneAsync(entity);
    }

    public async Task Update(T entity)
    {
        await entities.ReplaceOneAsync(T => T.Id == entity.Id, entity);
    }

    public async Task DeleteById(string id)
    {
        await entities.DeleteOneAsync(entity => entity.Id == id);
    }
}
