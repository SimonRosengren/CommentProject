using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CommentProject.Models
{
    public class CommentDbContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
    }
}