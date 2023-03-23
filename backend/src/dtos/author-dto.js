module.exports = class AuthorDto {
    username;
    image;

    constructor(model) {
        (this.userName = model.username), (this.image = model.image);
    }
};
