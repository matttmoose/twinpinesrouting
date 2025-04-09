const redirects = require("./redirects.json");

module.exports = async function (context, req) {
  const originalUrl = req.headers["x-ms-original-url"];
  const path = new URL(originalUrl).pathname;

  // Remove leading slashes and "/api/redirect" if present
  const cleaned = path.replace(/^\/+/, "").replace(/^api\/redirect\/?/, "");
  const cleanPath = `/${cleaned}`;

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
