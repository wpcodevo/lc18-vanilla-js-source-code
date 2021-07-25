import Form from "../components/Form.js";
const ContactScreen = {
  render: () => {
    return `<div class="blog-detail">
            <div class="side-ad">
              <a href="#" class="vertical-ad">
              <img src="/images/side-ad.svg"/>
              </a>
            </div>
            <div class="article-container">
            <div class="content">
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laborum labore recusandae ratione dolorum deserunt maiores,
            magni magnam ab vitae provident expedita eius alias quisquam
            tempora temporibus, molestiae consequatur esse id.
            </p>
            <div class="content-img">
            <img src="./images/Asset 4.svg" alt="" />
            </div>
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laborum labore recusandae ratione dolorum deserunt maiores,
            magni magnam ab vitae provident expedita eius alias quisquam
            tempora temporibus, molestiae consequatur esse id.
            </p>
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Laborum labore recusandae ratione dolorum deserunt maiores,
            magni magnam ab vitae provident expedita eius alias quisquam
            tempora temporibus, molestiae consequatur esse id.
            </p>
            ${Form.render()}
            </div>
            </div>
            <div class="side-ad">
              <a href="#" class="vertical-ad">
              <img src="/images/side-ad.svg"/>
              </a>
            </div>
            </div>`;
  },
  after_render: async () => {
    if (Form.after_render) await Form.after_render();
  },
};

export default ContactScreen;
