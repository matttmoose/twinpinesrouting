const redirects = require("./redirects.json");

module.exports = async function (context, req) {
  const raw = req.params.path || "/";
  const cleanPath = `/${raw.replace(/^\/+/, "")}`;
  context.log("Requested path:", cleanPath);

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
