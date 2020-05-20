const regExp = /<\s*([a-zA-Z_][0-9a-zA-Z_]*)\s*\/>/g

export default (string, data) => {
    if (!data)
        return string

    return string.replace(regExp, function replaceArg(match, group, i, index) {
        if (data.hasOwnProperty(group)) {
            return data[group]
        } else {
            return match
        }
    })
}