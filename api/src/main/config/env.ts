export default {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/talk-more',
  jwtSecret: process.env.JWT_SECRET || 'f9&KL$m0Z*x2p!'
}
