export default {
  routes: [
    {
      method: "POST",
      path: "/articles/:articleId/likes",
      handler: "like.create",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "DELETE",
      path: "/articles/:articleId/likes",
      handler: "like.delete",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/articles/:articleId/likes",
      handler: "like.findOne",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
