const image = obj => {
  if (!obj) return null

  const { url, mime, width, height } = obj
  return { url, mime, width, height }
}
image._name = 'media.image'

module.exports = image
