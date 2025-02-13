using Blogs.DAL.Entity;
using Blogs.DAL.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blogs.DAL.DBContext;
using Blogs.DAL.Repositories;
using Blogs.DAL.DBContext;

namespace Blogs.DAL.Repositories
{
    public class UserRepository : Repository<User, UserPostContext>, IUserRepository
    {
        

        //DI of DbContex
        private readonly UserPostContext _context;
        //constructor to bring dbContex
        public UserRepository(UserPostContext context) : base(context) 
        {
            _context = context;
        }
        

        

        



    }
}