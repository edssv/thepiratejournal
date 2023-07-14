"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query("api::article.article").findOne({
      where: { slug: id },
      populate: [
        "createdBy",
        "updatedBy",
        "cover",
        "likes",
        "author",
        "author.image",
      ],
    });

    entity.createdBy = {
      id: entity.createdBy.id,
      firstname: entity.createdBy.firstname,
      lastname: entity.createdBy.lastname,
    };
    entity.updatedBy = {
      id: entity.updatedBy.id,
      firstname: entity.updatedBy.firstname,
      lastname: entity.updatedBy.lastname,
    };

    await strapi.db.query("api::article.article").update({
      where: { id: entity.id },
      data: { views: parseInt(entity.views) + 1 },
    });

    entity.views = parseInt(entity.views) + 1;

    return this.transformResponse(entity);
  },

  async findManyByUserLike(ctx) {
    const { id } = ctx.state.user;

    const articles = await strapi.db
      .query("api::article.article")
      .findMany({ where: { likes: { user: { id } } }, populate: ["cover"] });
    console.log(articles);
    return this.transformResponse(articles);
  },
}));
