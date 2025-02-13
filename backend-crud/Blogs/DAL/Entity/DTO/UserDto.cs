namespace Blogs.DAL.Entity.DTO
{
    

    public class UserDto
    {
        
        public int Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public bool IsActive { get; set; }

        public static implicit operator UserDto(User user)
        {
            throw new NotImplementedException();
        }
    }

    public class UserAddDto
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Phone { get; set; }

        public bool IsActive { get; set; }
    }

    public class UserIdRequest
    {
        public int id { get; set; }
    }


    public class UserUpdateDto
    {
        public string? Name { get; set; }

        public string? Email { get; set; }

        public string Phone { get; set; }

        public bool? IsActive { get; set; }
    }

    public class UserUpdateRequest
    {
        public int id { get; set; } // ID now comes from the request body
        public UserUpdateDto UpdatedDto { get; set; } // Existing DTO
    }
}
