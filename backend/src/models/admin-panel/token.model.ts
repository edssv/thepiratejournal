import { Schema, model } from 'mongoose';
import { Account } from '../../lib/interfaces';

const AdminPanelTokenSchema = new Schema({
    user: { type: String },
    refreshToken: { type: String, required: true },
});

const AdminPanelToken = model<Account>('AdminPanelToken', AdminPanelTokenSchema);

export default AdminPanelToken;
