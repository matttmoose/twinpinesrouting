const path = require("path");
const fs = require("fs");

module.exports = async function (context, req) {
  const route = req.params.path || "/";
  const cleanPath = `/${route.replace(/^\/+/,"")}`;

  const redirectsPath = path.join(__dirname, "../../redirects.json");
  const redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf-8"));

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