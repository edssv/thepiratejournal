module.exports = class UserDto {
    username;
    email;
    avatar;
    id;
    isActivated;

    constructor(model) {
        (this.username = model.username),
            (this.email = model.email),
            (this.avatar = model.avatar),
            (this.id = model._id);
        this.isActivated = model.isActivated;
    }
};
