using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommentProject.Controllers
{
    public class TopicsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}