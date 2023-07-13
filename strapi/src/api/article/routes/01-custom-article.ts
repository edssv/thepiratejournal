export default {
  routes: [
    {
      method: "GET",
      path: "/articles/likes",
      handler: "article.findManyByUserLike",
      config: {
        policies: ["global::is-authenticated"],
      },
    },
  ],
};
