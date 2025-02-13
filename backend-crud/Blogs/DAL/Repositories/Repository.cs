using Blogs.DAL.IRepositories;
using Blogs.DAL.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;

namespace Blogs.DAL.Repositories
{
    public abstract class Repository<T, Tcontext> : IRepository<T> where T : class where Tcontext : DbContext
    {
        
            protected readonly Tcontext _contex;
            private readonly DbSet<T> _dbSet;

            public Repository(Tcontext context)
            {
                //this.contex == _contex
                _contex = context;
                _dbSet = _contex.Set<T>();
            }

            

        //fetch all user generic 
        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null)
        {

            IQueryable<T> result = _contex.Set<T>();
            if(filter!= null)
            {
                result = result.Where(filter);
            }
            return await result.ToListAsync(); 
        }


        //add users generic
        public async Task<T> AddAsync(T entity)
        {
            _contex.Set<T>().Add(entity);
            SaveChangesManaged();
            return entity;

        }

        


        public async Task<T> FindById(int id)
        {
            return await _dbSet.FindAsync(id);
        }


        //Update user generic async 
        public async Task<bool>  UpdateAsync( T entity)
        {
            _contex.Entry(entity).State= EntityState.Modified;

            SaveChangesManaged();

            return true;
        }


        //soft delete
        public async Task<bool> SingleUpdate(T entity)
        {
            _contex.Entry(entity).State = EntityState.Modified;
            SaveChangesManaged();
            return true;
        }

        public async Task<ICollection<T>> GetAllByConditionAsync(Expression<Func<T, bool>> condition1, Expression<Func<T, bool>> condition2)
        {
            IQueryable<T> result = _contex.Set<T>();
            if (condition1 != null)
            {
                result = result.Where(condition1);
            }
            if (condition2 != null)
            {
                result = result.Where(condition2);  
            }

            return await result.ToListAsync();
        }

        //get single by id
        public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> condition)
        {
            var singleUser = await _contex.Set<T>().Where(condition).SingleOrDefaultAsync();
            return singleUser;
        }

       

        //save in database
        public void SaveChangesManaged()
                {
                    _contex.SaveChanges();
                }

        
    }
}
