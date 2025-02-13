using Blogs.DAL.DBContext;
using Blogs.DAL.Entity;
using Blogs.DAL.IRepositories;

namespace Blogs.DAL.Repositories
{
    public class PostRepository : Repository<Post, UserPostContext>, IPostRepository
    {

        //DI of DbContex
        private readonly UserPostContext _context;
        //constructor to bring dbContex
        public PostRepository(UserPostContext context) : base(context)
        {
            _context = context;
        }
    }
}
