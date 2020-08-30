const search = require('../../../src/search')

module.exports = {
  suggest: async ctx => {
    return await search.suggest(ctx.query.category, ctx.query.text)
  },

  search: async ctx => {
    return await search.search(ctx.query.category, ctx.query.text, ctx.query.pageSize, ctx.query.pageIndex)
  }
}


