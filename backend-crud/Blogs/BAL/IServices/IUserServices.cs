using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Blogs.DAL.Entity.DTO;
using Blogs.DAL.Entity;
using System.Linq.Expressions;




namespace Blogs.BAL.IServices
{
    public interface IUserService
    {
        
        Task<ICollection<UserDto>> GetAllUsers(string? searchText);
        Task<User> AddUserAsyncService(UserAddDto user);
        Task<bool> UpdateUserService(int id, UserUpdateDto userDto);
        Task<bool> DeleteUserService(int id);
        Task<ICollection<UserDto?>> GetPostsByConditionAsync(Expression<Func<User, bool>> condition);
        Task<UserDto?> GetSingleAsyncService(int id);
        Task<bool> ActivateUserService(int id);
    }
}
