using ReactWithAsp.net.Data;
using ReactWithAsp.net.Models;

namespace ReactWithAsp.net.Services
{
    public class PostService : IPostsService
    {
        private MyDataContext _dataContext;

        public PostService(MyDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public PostModel Create(PostModel model)
        {
            var lastPost = _dataContext.Posts.LastOrDefault();
            int newId = lastPost is null ? 1 : lastPost.Id + 1;

            model.Id = newId;
            _dataContext.Posts.Add(model);

            return model;
        }

        public PostModel Update(PostModel model)
        {
            var modelToUpdate = _dataContext.Posts.FirstOrDefault(x => x.Id == model.Id);
            modelToUpdate.Header = model.Header;
            modelToUpdate.Text = model.Text;

            return modelToUpdate;
        }

        public void Delete(int id)
        {
            var modelToDelete = _dataContext.Posts.FirstOrDefault(y => y.Id == id);
            _dataContext.Posts.Remove(modelToDelete);
        }

        public PostModel Get(int id)
        {
            return _dataContext.Posts.FirstOrDefault(y => y.Id == id);
        }

        public List<PostModel> Get()
        {
            return _dataContext.Posts;
        }
    }
}
