using AutoMapper;
using Blogs.DAL.Entity;
using Blogs.DAL.Entity.DTO;

namespace Blogs.Helper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<UserAddDto, User>();
            CreateMap<User, UserAddDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<PostUpdateDto, Post>();
            CreateMap<PostDto, Post>();
            CreateMap<Post, PostDto>();
            CreateMap<PostAddDto, Post>();
            CreateMap<Post, PostAddDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>();
        }
    }
}