const dotenv=require('dotenv').config({path: './.env'});

module.exports={
  APP_PORT:process.env.APP_PORT,
  CLIENT_ID:process.env.CLIENT_ID,
  // CLIENT_ID:'044db8a6985550d0c4cd',
  CLIENT_SECRET:process.env.CLIENT_SECRET,
  // CLIENT_SECRET:'04f9d7b03607115bc145e7d75c7bdadaa23b64d5',
  REDIRECT_URI:process.env.REDIRECT_URI
}
