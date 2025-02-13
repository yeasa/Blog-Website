using Microsoft.EntityFrameworkCore.Storage;
using System.Linq.Expressions;

namespace Blogs.DAL.IRepositories
{
    public interface IRepository<T> where T : class
    {
        Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);
        Task<T> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);

        Task<T> FindById(int id);
        Task<bool> SingleUpdate(T entity);

        Task<T?> GetSingleAsync(Expression<Func<T, bool>> condition);

        Task<ICollection<T>> GetAllByConditionAsync(Expression<Func<T, bool>> condition1,Expression<Func<T,bool>> condition2);
    }
}