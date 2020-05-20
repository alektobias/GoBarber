export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expireIn: '1d',
  },
};
