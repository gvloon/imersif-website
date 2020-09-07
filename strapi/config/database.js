module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        client: env('DATABASE_CLIENT', 'mongo'),
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi')
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
