using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Blogs.DAL.Entity.DTO
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
    }
}
