using Blogs.DAL.DBContext;
using Blogs.DAL.Entity;
using Blogs.DAL.IRepositories;

namespace Blogs.DAL.Repositories
{
    public class CategoryRepository : Repository<Category, UserPostContext>, ICategoryRepository
    {
        private readonly UserPostContext _contex;

        public CategoryRepository(UserPostContext contex) : base(contex)
        {
            _contex = contex;
        }
    }
}
