using AutoMapper;
using Blogs.DAL.IRepositories;
using Blogs.DAL.Entity.DTO;
using Blogs.BAL.IServices;
using Blogs.DAL.Entity;
using Microsoft.Extensions.Hosting;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

namespace Blogs.BAL.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;

        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        //Fetch all post
        public async Task<ICollection<PostDto>> GetAllPosts(string searchText)
        {
            var posts = await _postRepository.GetAllAsync(p => (string.IsNullOrEmpty(searchText.ToLower()) || p.Title.ToLower().Contains(searchText.ToLower())));
            posts = posts.Where(p=>p.IsDeleted==false).ToList();
            return _mapper.Map<ICollection<PostDto>>(posts);
        }

        //get post by id 
        public async Task<PostDto?> GetSinglePostService(int id)
        {
            var requiredPost = await _postRepository.GetSingleAsync(p => p.Id == id);
             
            return _mapper.Map<PostDto>(requiredPost);
        }
        

        //update post
        public async Task<bool> UpdatePostService(int id,PostUpdateDto updatedPost )
        {
            //var UpdatedEntity = _mapper.Map<Post>(UpdatedPostDto);
           

            var existingEntity = await _postRepository.FindById(id);
            if (existingEntity == null)
            {
                return false;
            }

            // Only update the fields passed in the UserDTO
            existingEntity.Title = updatedPost.Title ?? existingEntity.Title;
            existingEntity.Description = updatedPost.Description ?? existingEntity.Description;
            existingEntity.IsPublished = updatedPost.IsPublished;


            //var UpdatedEntity = _mapper.Map<Post>(UpdatedPostDto);


            return await _postRepository.UpdateAsync(existingEntity);

        }

        //Add Post 
        public async Task<bool> AddPostService(PostAddDto postDto) 
        {
            var newPost = _mapper.Map<Post>(postDto);

            await _postRepository.AddAsync(newPost);
            return true;

        }

        //soft delete (update isDelete)
        public async Task<bool> DeletePostService(int id)
        {
            var post = await _postRepository.FindById(id);
            if (post == null)
            {
                return false;
            }
            post.IsDeleted = true;
            return await _postRepository.SingleUpdate(post);
        }

        //punlish un-publish post
        public async Task<bool> PublishUnpublishedPostService(int id)
        {
            var post = await _postRepository.FindById(id);
            if(post == null)
            {
                return false;
            }
            post.IsPublished = true;
            return await _postRepository.SingleUpdate(post);
        }

        //get by condition
        public async Task<ICollection<PostDto?>> GetPostsByConditionAsync(Expression<Func<Post, bool>> condition1)
        {
            var posts = await _postRepository.GetAllByConditionAsync(condition1,p=>p.IsDeleted == false); // Fetch posts by condition
            return _mapper.Map<ICollection<PostDto>>(posts); // Map and return the result
        }

    }
}
