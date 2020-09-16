export const number = (input, defaultValue = 0) => {
    const value = Number.parseFloat(input)
    return Number.isNaN(value) ? defaultValue : value
}

export const text = (input, defaultValue = null) => {
    return input ? input.toString() : defaultValue
}

export const map = (input, map, defaultValue = null) => {
    return map.hasOwnProperty(input) ? map[input] : defaultValue
}

