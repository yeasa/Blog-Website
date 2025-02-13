using Blogs.BAL.IServices;
using Blogs.DAL.Repositories;
using Blogs.DAL.Entity.DTO;
using AutoMapper;
using Blogs.DAL.IRepositories;

namespace Blogs.BAL.Services
{
    
    public class CategoryService: ICategoryService
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepo = categoryRepository;
            _mapper = mapper;
        }


        //Fetch all category 
        public async Task<ICollection<CategoryDto>> GetallCategoryService()
        {
            var categories = await _categoryRepo.GetAllAsync();
            return _mapper.Map<ICollection<CategoryDto>>(categories);
        }
    }
}
