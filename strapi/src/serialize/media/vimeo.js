const vimeo = obj => {
  if (!obj) return null

  const { key: id } = obj
  return { id }
}
vimeo._name = 'media.youtube'

module.exports = vimeo
