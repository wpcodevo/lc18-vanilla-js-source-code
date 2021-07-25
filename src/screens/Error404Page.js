const Error404Page = {
  render: () => `
  <div class='error404'>
      <div class='errorImage'>
        <img
          src='/images/404.svg'
          alt='404 image'
        />
      </div>
      <div class='content'>
        <p>The Page You are looking for is now beyound our Reach...</p>
          <a href='/#/' aria-label='back to home'>Go Home</a>
      </div>
    </div>
  `,
  after_render: () => {
    setTimeout(() => {
      location.assign("/#/");
    }, 5000);
  },
};

export default Error404Page;
