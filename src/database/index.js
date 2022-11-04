const mongoose = require('mongoose');
require('dotenv').config()

function connectToDatabase() {
  mongoose.connect(`mongodb+srv://${process.env.AUTH_USER}:${process.env.AUTH_PASSWORD}@cluster0.nlo6kmo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  const db = mongoose.connection;
  db.on("error", (error) => { console.log(error.message) })
  db.once("open", () => { console.log("mongoose.Connection sucess") })
}

module.exports = connectToDatabase; 