/**
 * like controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::like.like",
  ({ strapi }) => ({
    async create(ctx) {
      const { articleId } = ctx.params;
      const { id: userId } = ctx.state.user;

      const findLike = await strapi.db.query("api::like.like").findOne({
        where: { article: { id: articleId }, user: { id: userId } },
      });
      if (findLike) return ctx.badRequest("Ты уже оценил эту статью");

      const entity = await strapi.db.query("api::like.like").create({
        data: { article: { id: articleId }, user: { id: userId } },
      });

      return this.transformResponse(entity);
    },
    async delete(ctx) {
      const { articleId } = ctx.params;
      const { id: userId } = ctx.state.user;

      const findLike = await strapi.db.query("api::like.like").findOne({
        where: { article: { id: articleId }, user: { id: userId } },
      });
      if (!findLike) return ctx.badRequest("Ты еще не оценил эту статью");

      const entity = await strapi.db.query("api::like.like").delete({
        where: { article: { id: articleId }, user: { id: userId } },
      });

      return this.transformResponse(entity);
    },

    async findOne(ctx) {
      const { articleId } = ctx.params;
      const { id: userId } = ctx.state.user;

      const findLike = await strapi.db.query("api::like.like").findOne({
        where: { article: { id: articleId }, user: { id: userId } },
      });

      return this.transformResponse({ isLike: !!findLike });
    },

    // async findManyByUser(ctx) {
    //   const { id: userId } = ctx.state.user;

    //   const likes = await strapi.db.query("api::like.like").findMany({
    //     where: { user: { id: userId } },
    //     populate: ["user", "article", "article.cover"],
    //   });
    //   const articles = likes.map((like) => like.article).flat();

    //   return this.transformResponse(articles);
    // },
  })
);
