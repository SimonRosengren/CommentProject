﻿using CommentProject.Models;
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
        [Route("api/get/topic")]
        public IEnumerable<Comment> Get()
        {
            using (var db = new CommentDbContext())
            {
                if (db.Comments.Count() <= 0)
                {
                    return null;
                }
                var comment = (from c in db.Comments
                               where c.Topic != null
                               group c by new { c.Topic }
                               into topics
                               select topics.FirstOrDefault()).ToArray();

                return comment;
            }
        }

        [HttpGet]
        [Route("api/get/random")]
        public IHttpActionResult GetRandom()
        {
            using (var db = new CommentDbContext())
            {
                Random rnd = new Random();

                var comment = (from c in db.Comments
                               where c.Topic != null
                               group c by new { c.Topic }
                               into topics
                               select topics.FirstOrDefault()).ToArray();

                return Ok(comment[rnd.Next(0, comment.Count())]);
            }
        }
    }
}
