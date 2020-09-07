module.exports = {
  timeout: 100,
  load: {
    before: ['responseTime', 'logger', 'public', 'cors', 'responses', 'gzip'],
    order: [
      "Define the middlewares' load order by putting their name in this array is the right order",
    ],
    after: ['parser', 'router'],
  },
  settings: {
    public: {
      enabled: true,
      path: './public',
      maxAge: 60000,
    },
  },
};
