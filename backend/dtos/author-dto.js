module.exports = class AuthorDto {
    userName;
    firstName;
    lastName;
    avatar;

    constructor(model) {
        (this.userName = model.userName),
            (this.firstName = model.firstName),
            (this.lastName = model.lastName);
        this.avatar = model.avatar;
    }
};
