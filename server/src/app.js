"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("../db/db"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
//initialize express
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// body-parser
app.use(body_parser_1.default.json());
// enable cors
app.use((0, cors_1.default)());
// config dotenv
dotenv_1.default.config();
//custom middleware
app.use("/", (req, res, next) => {
    next();
});
app.use((0, cors_1.default)({
    origin: 'http://example.com',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
}));
// DB connection 
(0, db_1.default)();
const port = process.env.PORT;
// const dbUrl = process.env.DB_URL;
// const apiKey = process.env.API_KEY;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/user", userRoutes_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
