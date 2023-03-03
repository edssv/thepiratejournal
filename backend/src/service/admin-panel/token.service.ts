import AdminPanelToken from '../../models/admin-panel/token.model';

export default class AdminPanelTokenService {
    public async saveToken(login: string, refreshToken: string) {
        const tokenData = await AdminPanelToken.findOne({ user: login });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await AdminPanelToken.create({ user: login, refreshToken });
        return token;
    }
}
