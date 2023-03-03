import { ObjectId } from 'mongodb';
import Draft from '../models/draft.model';
import { Draft as IDraft } from '../lib/interfaces';

export default class DraftService {
    public async createDraft(authorId: string, authorUsername: string, data: IDraft) {
        const draftId = data._id || undefined;

        const draft = await Draft.findOneAndUpdate(
            { _id: new ObjectId(draftId) },
            {
                title: data.title,
                cover: data.cover,
                blocks: data.blocks,
                tags: data.tags,
                category: data.category,
                author: { _id: authorId, username: authorUsername },
            },
            { upsert: true }
        );

        return draft;
    }

    public async getOneDraft(_id: string) {
        const draft = await Draft.findById(_id);

        if (!draft) return;

        return Object.assign(draft, { isPublished: false });
    }
}
