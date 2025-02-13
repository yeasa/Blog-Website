using Blogs.DAL.Entity;
using Blogs.DAL.IRepositories;
using System.Linq.Expressions;

namespace Blogs.DAL.IRepositories
{
    public interface IUserRepository : IRepository<User>
    {
        //Task<CreateUserDto> CreateUserAsync(CreateUserDto userDto);
        //Task<UserDto> GetUserByIdAsync(int Id);
        //Task<ICollection<User>> GetAllUsersAsync();
        //Task<User> AddUserAsyncRepository(User user);
        //public Task<bool> UpdateUserAsyncRepository(int id, User user);
        
    }
}
