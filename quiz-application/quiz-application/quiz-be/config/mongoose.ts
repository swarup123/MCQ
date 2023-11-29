import mongoose from 'mongoose';
const url = "mongodb://db:27017/user";
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});


/**
 * Connect to mongo db
 *
 * @return {object} Mongoose connection
 * @public
 */

const MongooseConnect = (): object => {
  mongoose.connect('mongodb://localhost:27017/question', {
  });
  return mongoose.connection;
};

export default MongooseConnect;
