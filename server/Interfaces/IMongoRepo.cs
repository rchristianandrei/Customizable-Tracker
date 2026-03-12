using System.Linq.Expressions;

namespace server.Interfaces;

public interface IMongoRepo<T> where T : IEntity
{
    Task Create(T entity);
    Task DeleteById(string id);
    Task<IEnumerable<T>> GetAll();
    Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> filter);
    Task<T> GetById(string id);
    Task<T> GetOne(Expression<Func<T, bool>> filter);
    Task Update(T entity);
}
