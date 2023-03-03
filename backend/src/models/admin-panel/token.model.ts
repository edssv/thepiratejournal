import { Schema, model } from 'mongoose';
import { Token } from '../../lib/interfaces';

const AdminPanelTokenSchema = new Schema({
    user: { type: String },
    refreshToken: { type: String, required: true },
});

const AdminPanelToken = model<Token>('AdminPanelToken', AdminPanelTokenSchema);

export default AdminPanelToken;
