namespace Blogs.DAL.Entity.DTO
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? CategoryId { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsPublished { get; set; } = false;
    }

    public class PostAddDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int? CategoryId { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsPublished { get; set; } = false;
    }

    public class PostIdRequestDto
    {
        public int id { get; set; }
    }

    public class PostUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public bool IsPublished { get; set; } = true;
    }

    public class PostUpdateRequest
    {
        public int id { get; set; } // ID now comes from the request body
        public PostUpdateDto UpdatedDto { get; set; } // Existing DTO
    }
}
