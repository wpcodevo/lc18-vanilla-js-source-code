import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getBlog } from "../api.js";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.sys.contentType.sys.id === "codeBlock") {
        return `<pre>
            <code>${node.data.target.fields.code}</code>
          </pre>`;
      }

      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return `<iframe
            src='${node.data.target.fields.embedUrl}'
            height='100%'
            width='100%'
            frameBorder='0'
            scrolling='no'
            title='${node.data.target.fields.title}'
            allowFullScreen=true
          />`;
      }
    },
    [INLINES.HYPERLINK]: (node, next) => {
      if (node.data.uri.includes("player.vimeo.com/video")) {
        return `<div class="iframe-container">
            <iframe
              title="${next(node.content)}"
              src="${node.data.uri}"
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>`;
      } else if (node.data.uri.includes("youtube.com/embed")) {
        return `<div class="iframe-container">
            <iframe
              title="${next(node.content)}"
              src="${node.data.uri}"
              allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>`;
      } else {
        return `<span class="color">
        <a href="${node.data.uri}">${next(node.content)}</a>
        </span>`;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return `<div class="content-img"><img
          src="https:${node.data.target.fields.file.url}"
          height="${node.data.target.fields.file.details.image.height}"
          width="${node.data.target.fields.file.details.image.width}"
          alt="${node.data.target.fields.description}"
        /></div>`;
    },
  },
};
const DetailsScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const blogdetails = await getBlog(request.slug);
    return blogdetails.map(
      (blog) => `
    <div class="blog-detail">
            <div class="side-ad">
              <a href="#" class="vertical-ad">
              <img src="/images/side-ad.svg"/>
              </a></div>
            <div class="article-container">
              <div class="top">
                <h1>${blog.title}</h1>
                <div class="info d-flex">
                  <span class="d-flex"
                    ><i class="bx bx-user"></i> ${blog.authorName}</span
                  >
                  <span class="d-flex"
                    ><i class="bx bx-time-five"></i> ${format(
                      parseISO(blog.createdAt),
                      "PPP"
                    )}</span
                  >
                </div>
              </div>
              <div class="featured-image">
                <img src="https:${blog.featuredImage}" alt="" />
              </div>
              <div class="ad d-flex">
                <a href="">
                <img src="/images/horizontal-ad.svg" />
                </a>
              </div>
              <div class="content">
                ${documentToHtmlString(blog.details, renderOptions)}
              </div>
            </div>
            <div class="side-ad">
              <a href="#" class="vertical-ad">
              <img src="/images/side-ad.svg"/>
              </a>
            </div>
          </div>
    `
    );
  },
  after_render: () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};

export default DetailsScreen;
