import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "../db/db"; 
import router from "../routes/userRoutes";
import bodyParser from "body-parser";

//initialize express
const app = express();
// middleware
app.use(express.json())
// body-parser
app.use(bodyParser.json());
// enable cors
app.use(cors());
// config dotenv
dotenv.config();

//custom middleware
app.use("/", (req, res, next) => {
  next();
})

app.use(cors({
  origin: 'http://example.com', // Specify the allowed origin(s)
  methods: 'GET,PUT,POST,DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
}));

// DB connection 
connectDB();

const port = process.env.PORT;
// const dbUrl = process.env.DB_URL;
// const apiKey = process.env.API_KEY;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/user", router);
  
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
  