using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CommentProject.Models
{
    public class Comment
    {
        public int ID { get; set; }
        public int Parent { get; set; }
        public string Author { get; set; }
        public string Message { get; set; }
        public string Topic { get; set; }
    }
}