const redirects = require("./redirects.json");

module.exports = async function (context, req) {
  const rawUrl = req.originalUrl || "/";
  const path = new URL(rawUrl, `https://${req.headers.host}`).pathname;
  context.log("Requested path:", path);

  const cleanPath = `/${path.replace(/^\/+/, "")}`;
  const target = redirects[cleanPath];

  if (target) {
    context.res = {
      status: 302,
      headers: {
        Location: target
      }
    };
  } else {
    context.res = {
      status: 404,
      body: `No redirect found for ${cleanPath}`
    };
  }
};
