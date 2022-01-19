const mongoose = require('mongoose');

const PORT = process.env.PORT,
  MONGO_URI = process.env.MONGO_URI;

function setUpDB(app) {
  function connect() {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => {
        app.listen(PORT, (error) => {
          console.log('Server is Up on PORT : ' + PORT);
        });
      })
      .catch((err) => console.log(err));
  }
  return { connect };
}

module.exports = setUpDB;
