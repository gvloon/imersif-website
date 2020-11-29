const config = require('config')

const upload = obj => {
  if (!obj) return null

  if (obj.hasOwnProperty('length')) {
    return obj.map(item)
  } else {
    return item(obj)
  }
}

const item = obj => {
  if (!obj) return null

  const { url, mime, width, height } = obj
  return { url: config.mediaUrl + url, mime, width, height }
}

upload._name = 'media.upload'

module.exports = upload
