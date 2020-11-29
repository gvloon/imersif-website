const media = require('../media')

const page = (obj, components) => {
  const {title, introduction, content, image} = obj
  return {
    title,
    introduction,
    content,
    image: media.upload(image)
  }
}

module.exports = page
