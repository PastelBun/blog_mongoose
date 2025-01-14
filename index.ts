import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import stringsController from "./controllers/strings";
import articleController from "./controllers/articleController";
import commentController from "./controllers/commentController";
import authorController from "./controllers/authorController";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;  // This should be in your .env file

if (!MONGO_URI) {
  throw new Error("MongoDB URI not defined in .env file.");
}

// Connect to MongoDB using MONGO_URI from .env
mongoose.connect(MONGO_URI);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', stringsController);
app.use('/articles', articleController);
app.use('/comments', commentController);
app.use('/authors', authorController);

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
