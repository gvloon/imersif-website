import util from 'util'

const regExp = /<\s*([a-zA-Z_][0-9a-zA-Z_]*)\s*\/>/g

export const template = (string, data) => {
    if (!string || !data) {
        return string
    }

    return string.replace(regExp, function replaceArg (match, group) {
        if (data.hasOwnProperty(group)) {
            return data[group]
        } else {
            return match
        }
    })
}

export const first = list => {
    if (!list || list.length === 0) {
        return {}
    }

    return list[0]
}

export const paginate = (data, pageSize, pageIndex) => {
    const start = pageIndex * pageSize
    const end = Math.min(start + pageSize, data.length)
    return data.slice(start, end)
}

export const categorize = (data, getCategoryKey) => {
    const categories = {}
    for (const item of data) {
        const key = getCategoryKey(item)
        if (categories.hasOwnProperty(key)) {
            categories[key].items.push(item)
        } else {
            categories[key] = { key, items: [item] }
        }
    }
    return Object.values(categories)
}

export const createArray = (size, cb) => {
    return Array(size).fill(undefined).map((_, index) => cb(index))
}

export const log = (obj, level = 5) => {
    console.log(util.inspect(obj, true, level))
}

export const debug = (obj, level = 5) => {
    return util.inspect(obj, true, level)
}

export const href = (url, ...values) => {
    const parts = url.split(/\[.*?\]/)
    let as = ''
    for (let i=0, n=parts.length; i<n; i++) {
        as += parts[i]
        if (i < values.length) {
            as += values[i]
        }
    }
    return { url, as }
}
