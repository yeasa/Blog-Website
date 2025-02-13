using Blogs.DAL.Entity;
using Blogs.DAL.Entity.DTO;
using System.Linq.Expressions;

namespace Blogs.BAL.IServices
{
    public interface IPostService
    {
        Task<ICollection<PostDto>> GetAllPosts(string searchText);
        Task<bool> UpdatePostService(int id, PostUpdateDto UpdatedPostDto);
        Task<bool> AddPostService(PostAddDto post);
        Task<bool> DeletePostService(int id);
        Task<ICollection<PostDto?>> GetPostsByConditionAsync(Expression<Func<Post, bool>> condition);
        Task<PostDto?> GetSinglePostService(int id);
        Task<bool> PublishUnpublishedPostService(int id);
    }
}
