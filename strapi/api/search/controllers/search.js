const search = require('../../../src/search')

module.exports = {
  suggest: async ctx => {
    return await search.suggest(ctx.query.type, ctx.query.text)
  },

  search: async ctx => {
    return await search.search(ctx.query.type, ctx.query.text)
  }
}


