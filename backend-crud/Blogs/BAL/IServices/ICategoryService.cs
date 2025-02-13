using Blogs.DAL.Entity.DTO;

namespace Blogs.BAL.IServices
{
    public interface ICategoryService
    {
        Task<ICollection<CategoryDto>> GetallCategoryService();
    }
}
