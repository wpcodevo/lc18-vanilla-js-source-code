import { format, parseISO } from "date-fns";
const Blog = {
  render: (blog) => {
    return `<div class="blog">
              <div class="blog-img">
                <a href="/#/blogs/${blog.slug}">
                <img src="https:${blog.thumbnail}" alt="" /></a>
              </div>
              <div class="blog-text">
                <h2>
                  <a href="/#/blogs/${blog.slug}"
                    >${
                      blog.title.length > 40
                        ? blog.title.substr(0, 40) + " ..."
                        : blog.title
                    }</a
                  >
                </h2>
                <div class="d-flex">
                  <div class="category">${blog.category}</div>
                  <div class="date">${format(
                    parseISO(blog.createdAt),
                    "PPP"
                  )}</div>
                </div>
                <div class="author d-flex">
                  <div class="author-image">
                    <img src="https:${blog.authorImage}" alt="" />
                  </div>
                  <div class="author-name">${blog.authorName}</div>
                </div>
              </div>
            </div>`;
  },
};

export default Blog;
