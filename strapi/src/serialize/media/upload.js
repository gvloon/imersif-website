const upload = obj => {
  if (!obj) return null

  const { url, mime, width, height } = obj
  return { url, mime, width, height }
}
upload._name = 'media.upload'

module.exports = upload
