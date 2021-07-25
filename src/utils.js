export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    slug: request[2],
    verb: request[3],
  };
};

export const showLoading = () => {
  document.getElementById("loading").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading").classList.remove("active");
};
