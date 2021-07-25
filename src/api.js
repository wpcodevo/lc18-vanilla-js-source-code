import { createClient } from "contentful";

const client = createClient({
  space: "contentful space Id here",
  accessToken: "contentful access token here",
});

export const getBlogs = async (limit = 6, skip = 0) => {
  try {
    // Pagination
    const response = await client.getEntries({
      content_type: "blog",
      limit,
      skip,
    });
    let blogs = response.items;
    blogs = blogs.map((item) => {
      const { id, createdAt } = item.sys;
      const { title, slug, authorName, category } = item.fields;
      const thumbnail = item.fields.thumbnail.fields.file.url;
      const authorImage = item.fields.authorImage.fields.file.url;
      return {
        id,
        title,
        thumbnail,
        slug,
        authorName,
        authorImage,
        createdAt,
        category,
      };
    });
    return blogs;
  } catch (err) {
    console.log(err);
  }
};

export const getBlog = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: "blog",
      "fields.slug": slug,
    });
    let blogdetails = response.items;
    blogdetails = blogdetails.map((item) => {
      const { id, createdAt } = item.sys;
      const { title, authorName, category } = item.fields;
      const details = item.fields.details;
      const featuredImage = item.fields.featuredImage.fields.file.url;
      return {
        id,
        title,
        featuredImage,
        details,
        authorName,
        createdAt,
        category,
      };
    });
    return blogdetails;
  } catch (err) {
    console.log(err);
  }
};
