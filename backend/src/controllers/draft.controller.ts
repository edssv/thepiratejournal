import { Request, Response } from 'express';
import DraftService from '../service/draft.service';

class DraftController {
    public DraftService = new DraftService();

    creating = async (req: Request, res: Response) => {
        const authorId = req.currentUser._id;
        const authorUsername = req.currentUser.username;
        const data = req.body;

        try {
            const draft = await this.DraftService.createDraft(authorId, authorUsername, data);

            res.json(draft);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    getOne = async (req: Request, res: Response) => {
        const _id = req.params._id;

        try {
            const data = await this.DraftService.getOneDraft(_id);
            return res.status(200).json(data);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default new DraftController();
