using Blogs.BAL.IServices;
using Microsoft.AspNetCore.Mvc;
using Blogs.DAL.Entity.DTO;


namespace Blogs.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("getAllPosts")]
        public async Task<IActionResult> GetPosts([FromQuery]string status = "all", [FromQuery]string searchText="")
        {
            try
            {
                var post = await _postService.GetAllPosts(searchText);

                if(status == "published")
                {
                    post = post.Where(p => p.IsPublished == true).ToList(); 
                }
                else if(status == "unpublished")
                {
                    post = post.Where(p => p.IsPublished == false).ToList();
                }

                return Ok(new { Message = "All posts fetched", posts = post });

            }
            catch(Exception ) 
            {
                return StatusCode(500, new { Message = "dotnet" });
            }
        }

        //Published post
        //[HttpGet("publishedPosts")]
        //public async Task<IActionResult> GetPublishedPost()
        //{
        //    try
        //    {
        //        var post = await _postService.GetPostsByConditionAsync(p => p.IsPublished == true);
        //        return Ok(new { Message = "Published post fetched.", posts = post });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new {message = "an error occur while fetching published post"});
                    
        //    }
        //}


        //deleted post
        ////deleted--->unpublished
        //[HttpGet("unpublishedPosts")]
        //public async Task<IActionResult> GetDeletedPost()
        //{
        //    try
        //    {
        //        var post = await _postService.GetPostsByConditionAsync(p => p.IsPublished == false);
        //        return Ok(new { Message = "Published post fetched.", posts = post }); 
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "an error occur while fetching published post" });

        //    }

        //}


        //get post by id 
        [HttpPost("getSinglePost")]
        public async Task<IActionResult> GetSinglePostController([FromBody] PostIdRequestDto request)
        {
            try
            {
                var requiredPost = await _postService.GetSinglePostService(request.id);
                if (requiredPost == null)
                {
                    return BadRequest(new { message = "post not found" });
                }
                return Ok(new { Message = "user fetched ", post = requiredPost });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "error occur while fetchin the post" });
            }
            
        }


        //Update
        [HttpPut("updatePost")]
        public async Task<IActionResult> UpdatePost([FromBody] PostUpdateRequest request)
        {
            try
            {
                if (request == null || request.id <= 0)
                {
                    return BadRequest(new { Message = "Invalid ID or empty request body.", success=false });
                }
                var updated = await _postService.UpdatePostService(request.id, request.UpdatedDto);
                if (!updated)
                {
                    return NotFound(new { Message = "Post not found", success = updated });
                }
                return Ok(new { Message = "Post Updated successfully" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the Post", details = ex.Message });
            }
        }

        //Add post 
        [HttpPost("addPost")]
        public async Task<IActionResult> AddPostConntroller([FromBody ] PostAddDto post)
        {
            Console.WriteLine("the post added is:",post); // Debugging log
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var postAdded = await _postService.AddPostService(post);
                return Ok(new { Message = "new Post added Successfully...",success=postAdded });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { Mesage = "an error ocur while creating the post. ", error = ex.InnerException?.Message});
            }
        }

        


        //softdelete (update)
        [HttpPut("deletePost")]
        public async Task<IActionResult> deletePostAsyncController([FromBody] PostIdRequestDto request)
        {
            try
            {
                if(request == null)
                {
                    return BadRequest("enter valid id");
                }
                var isDeleted = await _postService.DeletePostService(request.id);
                if (!isDeleted)
                {
                    return NotFound(new { Message = "post not found" });
                }
                return Ok(new { Message = "post deleted sccessfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statuscode = 500, messege = "An error occurred while deleting the post", details = ex.Message });
            }
        }


        //publish unpublished post
        [HttpPut("publishUnpublishPost")]
        public async Task<IActionResult> PublishUnpublishPostsController([FromBody] PostIdRequestDto request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("enter valid id");
                }
                var published = await _postService.PublishUnpublishedPostService(request.id);
                if (!published)
                {
                    return NotFound(new { Message = "post not found" });
                }
                return Ok(new { Message = "post published sccessfully" });
            }catch(Exception ex)
            {
                return StatusCode(500, new { statuscode = 500, messege = "An error occurred while publisheing the post", details = ex.Message });
            }
        }

    }
}
