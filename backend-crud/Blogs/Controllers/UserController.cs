using System.Threading.Tasks;
using Blogs.Controllers;
using Blogs.BAL.IServices;
using Microsoft.AspNetCore;
using Blogs.DAL.Entity.DTO;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Linq.Expressions;

namespace Blogs.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }



        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetUsers([FromQuery]string? searchText, [FromQuery] string status = "all")
        {
            try
            {
                var allUsers = await _userService.GetAllUsers(searchText);
                status = status.ToLower();
                if (status == "active")
                {
                    allUsers = allUsers.Where(u => u.IsActive == true).ToList() ;

                }else if(status == "inactive")
                {
                    allUsers = allUsers.Where(u => u.IsActive == false).ToList();
                }
                return Ok(new { Message = "fetched all users", StatusCode = 202, Users = allUsers });
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "An error occured while fetching users..." });
            }

        }

        //get single user by id 
        [HttpPost("getSingleUser")]
        public async Task<IActionResult> GetSingleAsync([FromBody] UserIdRequest request)
        {
            try
            {
                var SingleUser = await _userService.GetSingleAsyncService(request.id);
                if(SingleUser == null)
                {
                    return BadRequest(new { Message = "No user found" });
                }
                return Ok(new { Message = "user fetched ", user = SingleUser });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "AN error occur while fetching user", error = ex.Message });
            }

            }



            //get active user
            [HttpGet("activeUser")]
        public async Task<IActionResult> GetActiveUsers()
        {
            try
            {
                var activeUser = await _userService.GetPostsByConditionAsync(u => u.IsActive == true);
                return Ok(new { message = "Active users fetched succefully", statuscode = 200, Users = activeUser });

            }catch(Exception ex)
            {
                return StatusCode(500, new { Message = "An error occured while fetching users..." });
            }
        }

        //get deleted(isActive==false) user
        [HttpGet("inActiveUser")]
        public async Task<IActionResult> GetDeletedUsers()
        {
            try
            {
                var deletedUser = await _userService.GetPostsByConditionAsync(u => u.IsActive == false);
                return Ok(new { message = "InActive users fetched succefully", statuscode = 200, Users = deletedUser });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occured while fetching users..." });
            }
        }

        //add users
        [HttpPost("addUser")]
        public async Task<IActionResult> AddUserAsyncController([FromBody] UserAddDto newCreatedUserDto)
        {
            try
            {
                //This property checks if the data received is valid according to the validation
                //rules defined in the UserDto class (using data annotations like [Required], [EmailAddress], etc.)
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState); //ModelState return error according to required dto
                }

                var createdUser = await _userService.AddUserAsyncService(newCreatedUserDto);
                return Ok(new { message = "new user has been added", success=true });
                //alternatively could have called another method to get the id or name of the added user via 
                //return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception)
            {
                return StatusCode(500, new { Message = "an error ocur while creating the user." }); // 500 Internal Server Error (or Problem Details)

            }
        }

        


        //Update user via id 
        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUserAsyncController([FromBody] UserUpdateRequest request)
        {
            try
            {
                if (request == null || request.id <= 0)
                {
                    return BadRequest(new { Message = "Invalid ID or empty request body.",success=false });
                }
                

                var updated = await _userService.UpdateUserService(request.id, request.UpdatedDto);
                if (!updated)
                {
                    return NotFound(new { Message = "User not found" });
                }
                return Ok(new { Message = "User Updated successfully" ,success=updated});

            } catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the user", details = ex.Message });
            }
        }

        //softdelete (update)
        [HttpPut("deleteUser")]
        public async Task<IActionResult> deleteUserAsyncController([FromBody] UserIdRequest request)
        {
            try
            {
                if (request == null)
                {
                    return NotFound(new { Message = "enter valid id", status=false });
                }
                var isDeleted = await _userService.DeleteUserService(request.id);
                if (!isDeleted)
                {
                    return NotFound(new { Message = "User not found",status=isDeleted });
                }
                return Ok(new { Message = "User deleted sccessfully", status = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statuscode= 500, messege = "An error occurred while deleting the user", details = ex.Message});
            }
        }

        //activate user
        [HttpPut("activateUser")]
        public async Task<IActionResult> activateUserAsyncController([FromBody] UserIdRequest request)
        {
            try
            {
                if (request == null)
                {
                    return NotFound(new { Message = "enter valid id", status = false });
                }
                var isActivated = await _userService.ActivateUserService(request.id);
                if (!isActivated)
                {
                    return NotFound(new { Message = "User not found", status = isActivated });
                }
                return Ok(new { Message = "User Activatedd sccessfully", status = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { statuscode = 500, messege = "An error occurred while activating the user", details = ex.Message });
            }

        }




        
    }
}