const device = {
    tethering: {
        'standalone': 'Standalone',
        'pc': 'PC',
        'mobile': 'Mobile'
    },
    dof: {
        'dof3': '3dof',
        'dof6': '6dof'
    },
    screen: {
        'lcd': 'LCD',
        'oled': 'OLED',
        'amoled': 'AMOLED',
        'lightwave': 'Lightwave'
    },
    trackingType: {
        'inside_out': 'Inside-out',
        'outside_in': 'Outside-in'
    }
}

export const deviceTethering = value => {
    return device.tethering[value] || '-'
}

export const deviceDof = value => {
    return device.dof[value] || '-'
}

export const deviceScreen = value => {
    return device.screen[value] || '-'
}

export const deviceTrackingType = value => {
    return device.trackingType[value] || '-'
}

export const deviceFov = value => {
    return value || '-'
}

export const deviceResolution = value => {
    return value || '-'
}