module.exports = {
  //Status Codes
  STATUS_CODE_200: 200,
  STATUS_CODE_401: 401,
  STATUS_CODE_400: 400,
  STATUS_CODE_404: 404,
  STATUS_CODE_500: 500,

  //Auth
  EMAIL: 'email',
  PASSWORD: 'password',

  //Constants For Auth API Start
  SERVER_ERROR: 'Internal Server Error.',
  USER_LOGGEDIN: 'User LoggedIn.',
  INVALID_EMAIL: 'Please include valid Email.',
  PASSWORD_REQUIRED: 'Password is required.',
  INVALID_CREDENTIALS: 'Invalid Credentials',

  //AUTH
  INVALID_TOKEN: 'Token is Invalid.',
  AUTH_DENIED: 'Authorization Denied.',
  NO_TOKEN: 'No Token.',
  NOT_FOUND: 'NOT FOUND',
  EXPIRES_IN: '30d',
  JWT_SECRET: 'jwtSecret',
  COMMON_PASSWORD: 'password',
  MONGO_URI: 'mongodb://localhost:27017/yammyfoods_db',
  MONGO_URI_CLOUD:
    'mongodb+srv://yammyfoodsdatabaseconnect:yammyfoods@database_connect_0987@yammyfoods.qne0s.mongodb.net/yammyfoods_db?retryWrites=true&w=majority'
};
