import { Request, Response, Router } from "express";
import Article from "../models/article";

const router: Router = Router();

router.post('/article', async (req: Request, res: Response) => {
  const data = new Article({
      header: req.body.header,
      content: req.body.content
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})
  }
})

export default router;