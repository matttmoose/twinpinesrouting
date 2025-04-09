const redirects = require("./redirects.json");

module.exports = async function (context, req) {
  const route = req.query.path || "/";
  context.log("Requested path:", route);
  
  const cleanPath = `/${route.replace(/^\/+/, "")}`;
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
