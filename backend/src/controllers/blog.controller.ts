import { Request, Response } from 'express';
import BlogService from '../service/blog.service';
import Blog from '../models/blog.model';
import CommentService from '../service/comment.service';
import UserService from '../service/user.service';
import User from '../models/user.model';

class BlogController {
    public BlogService = new BlogService();
    public CommentService = new CommentService();
    public UserService = new UserService();

    public getAll = async (req: Request, res: Response) => {
        try {
            const articles = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });

            res.status(200).json(articles);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    public getOne = async (req: Request, res: Response) => {
        const id = req.params.id;

        try {
            const article = await this.BlogService.getOneArticle(id);

            res.status(200).json(article);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new BlogController();
