import { model, Schema } from 'mongoose';
import { Token } from '../lib/interfaces';

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
});

const Token = model<Token>('Token', TokenSchema);

export default Token;
