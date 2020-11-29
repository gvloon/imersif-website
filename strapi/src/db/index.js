const find = async (name, ctx, populate) => {
  if (ctx.query._q) {
    return await strapi.services[name].search(ctx.query);
  } else {
    return await strapi.services[name].find(ctx.query, populate);
  }
}

const findOne = async (name, populate) => {
  return await strapi.services[name].find(populate)
}

const findBySlug = async (name, ctx, populate) => {
  const { slug } = ctx.params
  return await strapi.services[name].findOne({ slug }, populate)
}

module.exports = {
  find,
  findOne,
  findBySlug
}
