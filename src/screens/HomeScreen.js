import { getBlogs } from "../api.js";

import Blog from "../components/Blog.js";

const HomeScreen = {
  render: async () => {
    const blogs = await getBlogs();
    return `<div>
    <div class="blog-layout container" id="blog-layout">
    ${blogs.map((blog) => `${Blog.render(blog)}`).join("\n")}
    </div>
    <div class="load-btn"><button class="load" id="load">Load more</button></div>
    </div>`;
  },
  after_render: () => {
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      const blogs = await getBlogs(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = blogs
        .map(function (blog) {
          return Blog.render(blog);
        })
        .join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (blogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "no more blogs";
      }
    }
  },
};

export default HomeScreen;
