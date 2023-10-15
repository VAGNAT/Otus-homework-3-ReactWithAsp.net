using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactWithAsp.net.Models;
using ReactWithAsp.net.Services;
using System.Reflection;

namespace ReactWithAsp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private IPostsService _postsService;

        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }

        [HttpPost]
        public ActionResult<PostModel> Create(PostModel model)
        {
            return _postsService.Create(model);
        }

        [HttpPatch]
        public ActionResult<PostModel> Update(PostModel model)
        {
            return _postsService.Update(model);
        }

        [HttpGet("{id}")]
        public ActionResult<PostModel> Get(int id)
        {
            return _postsService.Get(id);
        }

        [HttpGet]
        public ActionResult<IEnumerable<PostModel>> GetAll()
        {
            return _postsService.Get();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postsService.Delete(id);
            return Ok();
        }

    }
}
