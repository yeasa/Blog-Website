using Blogs.BAL.IServices;
using Blogs.DAL.Entity.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blogs.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService; 
        }

        [HttpGet("getAllCategory")]
        public async Task<IActionResult> GetAllCategoryController()
        {
            try
            {
                var categoryList = await _categoryService.GetallCategoryService();
                if (categoryList == null)
                {
                    return NotFound();
                }
                return Ok(new { Message = "categories fetched succeffuly", categories = categoryList });
            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "An error occured while fetching Category..", error = ex.Message });
            }

        }


    }
}
