using CommentProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CommentProject.ApiControllers
{
    public class TopicController : ApiController
    {

        [HttpGet]
        [Route("api/Topic")]
        public IEnumerable<Comment> Get()
        {
            //Comment com = new Comment();
            using (var db = new CommentDbContext())
            {
                //var Test = db.Comments.Where(s => s.Topic == com.Topic).ToArray();
                var comment = (from c in db.Comments
                               where c.Topic != null
                               group c by new { c.Topic }
                               into topics
                               select topics.FirstOrDefault()).ToArray();

                return comment;
            }
        }
    }
}
