module.exports = class UserDto {
    userName;
    firstName;
    lastName;
    email;
    avatar;
    id;
    isActivated;

    constructor(model) {
        (this.userName = model.userName),
            (this.firstName = model.firstName),
            (this.lastName = model.lastName),
            (this.email = model.email),
            (this.avatar = model.avatar),
            (this.id = model._id);
        this.isActivated = model.isActivated;
    }
};
