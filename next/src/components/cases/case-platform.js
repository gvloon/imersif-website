const CasePlatform = ({ useCase }) => {
    const { platforms, devices } = useCase
    if (!platforms || !platforms.length)
        return ''

    let platform = platforms.join(',')
    // if (devices && devices.length) {
    //     platform += '(' + devices.join(',') + ')'
    // }

    return platform
}

export default CasePlatform
