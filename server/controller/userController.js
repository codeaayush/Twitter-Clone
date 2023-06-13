"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    // Route handler method for handling GET /users
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name: username, password: plainTextPassword, email } = req.body;
            if ((!username || typeof username !== "string") || (!plainTextPassword || typeof plainTextPassword !== "string") || (!email || typeof email !== "string")) {
                return res.status(400).json({ message: "invalid data" });
            }
            const password = yield bcrypt_1.default.hash(plainTextPassword, 10);
            try {
                const response = yield user_1.default.create({
                    name: username,
                    password,
                    email
                });
                return res.status(201).json({ message: { id: response._id } });
            }
            catch (err) {
                console.log(err);
                if (err) {
                    return res.status(409).json({ message: "User Already exist" });
                }
            }
            return res.status(500).send();
        });
    }
    // Route handler method for handling GET /users/:id
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId = req.params.id;
            const { email, password } = req.body;
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "invalid" });
            }
            const isEqual = yield bcrypt_1.default.compare(password, user.password);
            console.log('345', process.env.SECRET);
            const secretOrPrivateKey = null;
            if (isEqual) {
                const token = jsonwebtoken_1.default.sign({
                    id: user._id,
                    name: user.name
                }, secretOrPrivateKey);
                return res.status(200).json({ status: "OK", access_token: token });
            }
            return res.status(400).json({ message: "Invalid username/password" });
        });
    }
}
exports.UserController = UserController;
