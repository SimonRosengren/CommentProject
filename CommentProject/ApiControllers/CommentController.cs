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
        /*Post comment on a comment*/
        /*Lägg till sp att man kan fykla i namn även här. Fixa också kommentarsfältet!*/
        [HttpPost]
        [Route("api/post/answer")]
        public IHttpActionResult PostAnswer(string author, string answer, int parent)
        {
            if (answer == null) 
            {
                return BadRequest();
            }
            Comment comment = new Comment();
            comment.Parent = parent;
            comment.Author = author;
            comment.Message = answer;
            using (var db = new CommentDbContext())
            {
                var returnValue = db.Comments.Add(comment);
                db.SaveChanges();
                return Ok(returnValue); //returns the comment that ahs been added
            }
        }

        [HttpPost]
        [Route("api/post/like")]
        public IHttpActionResult LikeComment(int ID)
        {
            using (var db = new CommentDbContext())
            {
                db.Comments.FirstOrDefault(c => c.ID == ID).Likes++;
                db.SaveChanges();
                return Ok();
            }
        }

        /*Returns all children of given parent*/
        [HttpGet]
        [Route("api/get/child")]
        public IEnumerable<Comment> GetChild(int parent)
        {
            using (var db = new CommentDbContext())
            {
                var comments = (from c in db.Comments
                                where c.Parent == parent
                                select c).ToArray();
                return comments;
            }
        }
        
        /*USED FOR DEVELOPMENT*/
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
