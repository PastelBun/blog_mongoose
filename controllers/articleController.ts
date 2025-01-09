import { Request, Response, Router } from "express";
import Article from "../models/article";
import Comment from "../models/comment";

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

router.post('/article/:id/comment', async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { content } = req.body;
  
      // Validate that content is provided
      if (!content) {
        return res.status(400).json({ message: 'Content is required for the comment.' });
      }
  
      // Create a new comment
      const newComment = new Comment({
        date: new Date(),
        content,
        article: id
      });
  
      // Save the new comment (using async/await)
      const savedComment = await newComment.save();
  
      // Add the comment to the article's comments array
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { $push: { comments: savedComment._id } },
        { new: true }
      );
  
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      // Respond with the updated article
      res.status(200).json(updatedArticle);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'An error occurred' });
      }
      
  });
  
  
export default router;