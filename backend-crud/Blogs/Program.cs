using Blogs.DAL.DBContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Blogs.DAL.IRepositories;
using Blogs.DAL.Repositories;
using Blogs.BAL.IServices;
using Blogs.BAL.Services;
//using Blogs.BAL


namespace Blogs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                {
                    policy.WithOrigins("http://localhost:4200") // Allow Angular frontend
                          .AllowAnyMethod()  // GET, POST, PUT, DELETE, etc.
                          .AllowAnyHeader(); // Allow all headers
                });
            });

            //DbContex
            builder.Services.AddDbContext<UserPostContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add services to the container.
            builder.Services.AddControllers();

            //mapper
            builder.Services.AddAutoMapper(typeof(Program));

            // Register Services DI Container
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IPostService, PostService>();
            builder.Services.AddTransient<IPostRepository, PostRepository>();
            builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
            builder.Services.AddTransient<ICategoryService, CategoryService>();

            
            

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseCors("AllowAngular");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            //app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
