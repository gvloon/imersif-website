const axios = require('axios')

const host = process.env.ELASTIC_HOST || 'localhost'
const port = process.env.ELASTIC_PORT || 9200
const baseUrl = `http://${host}:${port}`

module.exports = async function(method, url, data) {
  try {
    const response = await axios({
      method,
      url: `${baseUrl}${url}`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.log(error && error.response && error.response.data && error.response.data.error ? error.response.data.error : error)
  }
}
