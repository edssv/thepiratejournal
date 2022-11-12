module.exports = class ArticleDto {
    id;
    author;
    title;
    cover;
    blocks;
    timestamp;
    views;
    likes;

    constructor(model) {
        (this.id = model._id),
            (this.author = model.author),
            (this.title = model.title),
            (this.cover = model.cover),
            (this.blocks = model.blocks);
        this.timestamp = model.timestamp;
        this.views = model.views;
        this.likes = model.likes;
    }
};
