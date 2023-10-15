using ReactWithAsp.net.Models;

namespace ReactWithAsp.net.Data
{
    public class MyDataContext
    {
        public List<PostModel> Posts { get; set; }

        public MyDataContext()
        {
            Posts = new()
            {
                new PostModel { Id = 1, Header = "First post", Text = "Hello" },
                new PostModel { Id = 2, Header = "Second post", Text = "Hello" },
                new PostModel { Id = 3, Header = "Third post", Text = "Hello" }
            };
        }
    }
}
