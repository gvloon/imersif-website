const vimeo = obj => {
  if (!obj) return null

  const { key: id } = obj
  return { id }
}
vimeo._name = 'media.vimeo'

module.exports = vimeo
