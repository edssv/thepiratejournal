import { NextFunction, Request, Response } from 'express';
import Draft from '../models/draft.model';
import Article from '../models/article.model';

export const compareAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        const draft = await Draft.findById(articleId);
        const editorId = req.currentUser._id.toString();

        if (!editorId) {
            return res.status(400).json({ message: 'Системе не удалось вас распознать.' });
        }

        if (!article && !draft) return res.status(400).json({ message: 'Статья не найдена.' });

        if (article) {
            const authorId = article.author._id.toString();

            if (!authorId) return res.status(400).json({ message: 'Автор статьи не найден.' });

            if (authorId !== editorId) {
                return res.status(401).json({ message: 'Вы не являетесь автором.' });
            }
        }

        if (draft) {
            const draftAuthorId = draft.author._id.toString();

            if (!draftAuthorId) {
                return res.status(400).json({ message: 'Автор черновика не найден.' });
            }

            if (draftAuthorId !== editorId) {
                return res.status(401).json({ message: 'Вы не являетесь автором.' });
            }
        }

        next();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = compareAuthor;
