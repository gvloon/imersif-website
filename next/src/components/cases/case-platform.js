const CasePlatform = ({ useCase }) => {
    const { platforms, devices } = useCase
    if (!platforms || !platforms.length)
        return 'Unknown'

    let platform = platforms.join(',')
    if (devices && devices.length) {
        platform += '(' + devices.join(',') + ')'
    }

    return platform
}

export default CasePlatform
