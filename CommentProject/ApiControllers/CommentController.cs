using CommentProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CommentProject.ApiControllers
{
   
    public class CommentController : ApiController
    {
        /*Add a comment to the database*/
        [HttpPost]
        public IHttpActionResult Post(Comment comment)
        {  
            if (comment == null)
            {
                return BadRequest();
            }
            using (var db = new CommentDbContext())
            {
                var returnValue = db.Comments.Add(comment);
                db.SaveChanges();
                return Ok(returnValue); //returns the comment that ahs been added
            }
        }
        public IEnumerable<Comment> GetAllFromTopic()
        {
            /*
            List<Comment> comments = new List<Comment>();
            if (topic == null)
            {
                return BadRequest();
            }
            using (var db = new CommentDbContext()) //Is iot more effective to crate as variable instead?
            {
                return Ok(db.Comments.All(c => c.Topic == topic));
            }
            */
            /*TEST*/
            using (var db = new CommentDbContext())
            {
                var comment = (from c in db.Comments
                               where c.Topic == "Cars"
                               select c).ToArray();
                return comment;
            }
            //using (var db = new CommentDbContext())
            //{
            //    return db.Comments.ToArray();
            //}
        }
        [HttpGet]
        [Route("api/Comment/Search")]
        public IEnumerable<Comment> Get(string topic)
        {
            using (var db = new CommentDbContext())
            {
                //var Test = db.Comments.Where(s => s.Topic == topic).ToArray();
                var comment = (from c in db.Comments
                               where c.Topic == topic
                               select c).ToArray();
                return comment;
            }
        }

    }
}
