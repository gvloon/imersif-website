import { config, _, api, delay } from 'common'

export const search = async (text, category, pageSize, pageIndex) => {
    pageSize = pageSize || 10
    pageIndex = pageIndex || 0
    const categoryObject = _.find(config.categories, cat => cat.value === category) || config.categories[0]
    const query = {
        text: text || '',
        category: categoryObject.value,
        pageSize,
        pageIndex
    }
    let data
    if (query.text) {
        data = await api({
            search: {
                __args: query,
                pageIndex: true,
                resultCount: true,
                results: {
                    title: true,
                    type: true,
                    highlight: true,
                    link: {
                        href: true,
                        as: true
                    }
                }
            }
        })
    } else {
        data = {
            search: {
                resultCount: 0,
                results: []
            }
        }
    }
    return {
        ...query,
        pageCount: Math.ceil(data.search.resultCount / query.pageSize),
        ...data.search,
    }
}