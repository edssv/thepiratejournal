import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { AdminPanelUser } from '../../lib/interfaces';
const jwt = require('jsonwebtoken');

const AdminTokenModel = require('./token.model');

const AdminPanelUserSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const AdminPanelUser = model<AdminPanelUser>('AdminPanelUser', AdminPanelUserSchema);

export default AdminPanelUser;
