using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommentProject.Controllers
{
    public class TopicController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}