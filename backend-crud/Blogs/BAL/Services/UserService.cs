using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Blogs.BAL.IServices;
using Blogs.DAL.Entity.DTO;
using Blogs.DAL.Entity;
using Blogs.DAL.IRepositories;
using Blogs.DAL.DBContext;
using System.Runtime.Serialization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Blogs.DAL.Repositories;
using Microsoft.Extensions.Hosting;


public class UserService : IUserService
{
    private readonly IUserRepository _userRepo;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepo = userRepository;
        _mapper = mapper;
    }

    
    //fetch all user 
    public async Task<ICollection<UserDto>> GetAllUsers(string? searchText)
    {
        var users = await _userRepo.GetAllAsync(u => (string.IsNullOrEmpty(searchText) || u.Name.ToLower().Contains(searchText.ToLower()) || u.Email.ToLower().Contains(searchText.ToLower())));
        users = users.Where(u => u.IsDeleted == false).ToList();
        return  _mapper.Map<ICollection<UserDto>>(users); //mappering userEntity(Entity type to userDto type)
    }


    //add users
    public async Task<User> AddUserAsyncService(UserAddDto userDto)
    {
        //map dto (received from controller) to entity(will be passed to repository)
        var userEntity = _mapper.Map<User>(userDto);

        //add additional properties like created at (system timedate)
        userEntity.IsActive = true; 


        //call the repository method
        var createdUser = await _userRepo.AddAsync(userEntity);

        return createdUser;
    }

    //update user
    public async Task<bool> UpdateUserService(int id, UserUpdateDto updatedUserDto)
    {
        ////map dto
        //var userEntity = _mapper.Map<User>(updatedUserDto);
        

        var existingEntity = await _userRepo.FindById(id);
        if(existingEntity == null)
        {
            return false;
        }

        // Only update the fields passed in the UserDTO
        existingEntity.Name = updatedUserDto.Name ?? existingEntity.Name;
        existingEntity.Email = updatedUserDto.Email ?? existingEntity.Email;
        existingEntity.Phone = updatedUserDto.Phone;
        existingEntity.IsActive = updatedUserDto.IsActive;

        return await _userRepo.UpdateAsync(existingEntity);

    }

    //soft delete (update isActive)
    public async  Task<bool> DeleteUserService(int id)
    {
        var user = await _userRepo.FindById(id);
        if(user == null)
        {
            return false;
        }
        user.IsDeleted = true;
        return await _userRepo.SingleUpdate(user);
    }

    //inactive to active 
    public async Task<bool> ActivateUserService(int id)
    {
        var user = await _userRepo.FindById(id);
        if (user == null)
        {
            return false;
        }
        user.IsActive = true;
        return await _userRepo.SingleUpdate(user);
    }


    //get by condition
    public async Task<ICollection<UserDto?>> GetPostsByConditionAsync(Expression<Func<User, bool>> condition1)
    {
        var users = await _userRepo.GetAllByConditionAsync(condition1,u=>u.IsDeleted == false);
        return _mapper.Map<ICollection<UserDto>>(users);
    }

    //get single user by condition
    public async Task<UserDto?> GetSingleAsyncService(int id)
    {
        var requiredUser = await _userRepo.GetSingleAsync(u => u.Id == id);

        return _mapper.Map<UserDto>(requiredUser);
    }


}
