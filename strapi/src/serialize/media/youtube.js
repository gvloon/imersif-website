const youtube = obj => {
  if (!obj) return null

  const { key: id } = obj
  return { id }
}
youtube._name = 'media.youtube'

module.exports = youtube
