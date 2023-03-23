module.exports = class UserDto {
    username;
    email;
    image;
    id;
    emailVerified;

    constructor(model) {
        (this.username = model.username), (this.email = model.email), (this.image = model.image), (this.id = model._id);
        this.emailVerified = model.emailVerified;
    }
};
