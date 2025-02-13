using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Blogs.DAL.Entity;

[Table("posts")]
public partial class Post
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [StringLength(200)]
    public string Title { get; set; } = null!;

    [Column("description")]
    public string Description { get; set; } = null!;

    [Column("created_by")]
    public int? CreatedBy { get; set; }

    [Column("created_date", TypeName = "timestamp without time zone")]
    public DateTime? CreatedDate { get; set; }

    [Column("is_published")]
    public bool? IsPublished { get; set; }

    [Column("category_id")]
    public int? CategoryId { get; set; }

    [Column("isDeleted")]
    public bool? IsDeleted { get; set; }

    [ForeignKey("CategoryId")]
    [InverseProperty("Posts")]
    public virtual Category? Category { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("Posts")]
    public virtual User? CreatedByNavigation { get; set; }
}
