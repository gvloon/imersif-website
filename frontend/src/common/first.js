export default (list) => {
    if (!list || list.length === 0)
        return {}

    return list[0]
}