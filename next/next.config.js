const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const webpack = require('webpack')
const path = require('path')

const plugins = [
    [
        withSass,
        {
        }
    ],
    [
        withImages,
        {

        }
    ]
]

module.exports = withPlugins(plugins, {
    webpack (config, options) {
        config.resolve.modules.push(path.resolve('./'))
        return config
    }
})
