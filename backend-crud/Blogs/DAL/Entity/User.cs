using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Blogs.DAL.Entity;

[Table("users")]
public partial class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Column("email")]
    [StringLength(100)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(14)]
    public string? Phone { get; set; }

    [Column("password")]
    [StringLength(50)]
    public string Password { get; set; } = null!;

    [Column("is_active")]
    public bool? IsActive { get; set; }

    [Column("isDeleted")]
    public bool? IsDeleted { get; set; } = false;

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
