"use strict";

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    // @ts-ignore
    const { data, meta } = await super.find(ctx);
    const query = strapi.db.query("api::article.article");
    await Promise.all(
      data.map(async (item, index) => {
        const foundItem = await query.findOne({
          where: {
            id: item.id,
          },
          populate: ["createdBy", "updatedBy"],
        });

        data[index].attributes.createdBy = {
          id: foundItem.createdBy.id,
          firstname: foundItem.createdBy.firstname,
          lastname: foundItem.createdBy.lastname,
        };
        data[index].attributes.updatedBy = {
          id: foundItem.updatedBy.id,
          firstname: foundItem.updatedBy.firstname,
          lastname: foundItem.updatedBy.lastname,
        };
      })
    );
    return { data, meta };
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.db.query("api::article.article").findOne({
      where: { slug: id },
      populate: ["createdBy", "updatedBy", "cover"],
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

    return this.transformResponse(entity);
  },
}));
