import User from "../model/user";
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export class UserController {
  // Route handler method for handling GET /users
  public async register(req: Request, res: Response) {
    const {name: username, password: plainTextPassword, email} = req.body;

    if ((!username || typeof username !== "string") || (!plainTextPassword || typeof plainTextPassword !== "string") || (!email || typeof email !== "string")) {
      return res.status(400).json({message: "invalid data"});
    }
    const password = await bcrypt.hash(plainTextPassword, 10); 
    try {
      const response = await User.create({
        name: username,
        password,
        email
      })
      return res.status(201).json({message: {id: response._id}});
    } catch(err) {
      console.log(err);
      if (err) {
        return res.status(409).json({message: "User Already exist"});
      }
    }
    return res.status(500).send();
  }

  // Route handler method for handling GET /users/:id
  public async login(req: Request, res: Response) {
    // const userId = req.params.id;
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: "invalid"});
    }
    const isEqual = await bcrypt.compare(password, user.password);
    console.log('345', process.env.SECRET);
    const secretOrPrivateKey = null;
    if (isEqual) {
      const token = jwt.sign({
        id: user._id,
        name: user.name
      }, secretOrPrivateKey);

      return res.status(200).json({status: "OK", access_token: token});
    }
    return res.status(400).json({ message: "Invalid username/password"});
  }

  // Route handler method for handling POST /users
//   public createUser(req: Request, res: Response): void {
//     // Logic to create a new user based on the request body
//     // ...
//     res.status(201).json();
//   }

  
//   // Route handler method for handling DELETE /users/:id
//   public deleteUser(req: Request, res: Response): void {
//     const userId = req.params.id;
//     // Logic to delete a user by ID
//     // ...
//     res.sendStatus(204);
//   }
}
