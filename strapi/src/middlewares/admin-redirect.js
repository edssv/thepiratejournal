module.exports = (_config, { strapi }) => {
  const redirects = ["/test", "/index.html"].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect("/test/admin"),
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};
