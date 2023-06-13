import mongoose, { ConnectOptions, connect } from "mongoose"

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
  // useCreateIndex: boolean
  // useFindAndModify: boolean
}

const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
  // useCreateIndex: true,
  // useFindAndModify: false,
  // user,
  // pass
}

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/twitterDB', options);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;





