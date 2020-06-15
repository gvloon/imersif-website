export default {
    publicApiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    dockerApiUrl: process.env.NEXT_DOCKER_STRAPI_URL || 'http://localhost:1337'
}
