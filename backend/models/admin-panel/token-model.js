const { Schema, model } = require('mongoose');

const AdminPanelTokenSchema = new Schema({
    user: { type: String },
    refreshToken: { type: String, required: true },
});

AdminPanelTokenSchema.statics.saveToken = async function (login, refreshToken) {
    const tokenData = await this.findOne({ user: login });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await this.create({ user: login, refreshToken });
    return token;
};

module.exports = model('AdminPanelToken', AdminPanelTokenSchema);
