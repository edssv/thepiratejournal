module.exports = class AuthorDto {
    username;
    avatar;

    constructor(model) {
        (this.userName = model.username), (this.avatar = model.avatar);
    }
};
