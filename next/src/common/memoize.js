import { memoize } from 'common'
import config from 'config'

export const getTypeMap = memoize(() => {
    const map = {}
    for (let type of config.types)  {
        map[type.id] = type
    }
    return map
})

export const getTypeById = id => {
    const map = getTypeMap()
    return map.hasOwnProperty(id) ? map[id] : null
}
