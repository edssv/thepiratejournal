import { model, Schema } from 'mongoose';
import { Account } from '@shared/interfaces/Account.interface';

const AccountSchema = new Schema({
    refreshToken: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Account = model<Account>('Account', AccountSchema);

export default Account;
