import express, { Express, Request, Response } from "express";
import stringsController from "./controllers/strings";
import mongoose from "mongoose";
import articleController from "./controllers/articleController"
import commentController from "./controllers/commentController";

mongoose.connect("mongodb+srv://djcsdj:yrQZBIliN4tvIlbL@blogmongoose.g4esp.mongodb.net/");
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

/*app.use('/', stringsController);*/
app.use('/articles', articleController);
app.use('/comments', commentController);

app.listen(3000,() => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});