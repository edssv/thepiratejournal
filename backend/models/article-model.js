const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    author: {
        _id: { type: String, required: true },
        username: { type: String, required: true },
    },
    title: { type: String, required: true },
    cover: {
        type: String,
        required: true,
    },
    blocks: {
        type: Array,
        required: true,
    },
    category: {
        categoryName: {
            type: String,
            required: true,
        },
        game: {
            type: String,
            // required: true,
        },
    },
    timestamp: {
        type: String,
        required: true,
    },
    views: {
        count: {
            type: Number,
            default: 0,
        },
    },
    likes: {
        count: {
            type: Number,
            default: 0,
        },
        users: [{ type: String, required: true }],
    },
});

articleSchema.statics.creating = async function (
    authorId,
    authorUsername,
    title,
    cover,
    blocks,
    category,
    time,
) {
    const article = await this.create({
        author: { _id: authorId, username: authorUsername },
        title,
        cover,
        blocks,
        category: { categoryName: category.categoryName, game: category.game },
        timestamp: time,
    });

    return article;
};

articleSchema.statics.editing = async function (articleId, title, cover, blocks) {
    if (!title || !cover || !blocks) {
        throw Error('Заголовок обложка и блоки обязательны.');
    }

    const article = await this.updateOne(
        { _id: articleId },
        {
            title: title,
            cover: cover,
            blocks: blocks,
        },
    );

    return;
};

articleSchema.statics.getAll = async function (section, currentUser) {
    if (section === 'following') {
        const followList = currentUser.follow;
        const articles = await this.find({ 'author._id': { $in: followList } });

        return articles;
    }

    if (section === 'for_you') {
        const articles = await this.find().exec();

        return articles;
    }
};

articleSchema.statics.searchArticles = async function (categoryName, sortType, searchValue) {
    const findCategoryParams = {
        'category.categoryName': categoryName ? categoryName : { $type: 'string' },
    };
    const findSearchParams = { title: { $regex: searchValue ? searchValue : '' } };
    const findParams = { $and: [findCategoryParams, findSearchParams] };
    const sortParams =
        sortType === 'recent'
            ? { timestamp: -1 }
            : sortType === 'appreciations'
            ? { 'likes.count': -1 }
            : { 'views.count': -1 };

    const articles = await this.find(findParams).sort(sortParams);

    return articles;
};

articleSchema.statics.getOne = async function (id) {
    const article = await this.findOneAndUpdate(
        { _id: id },
        { $inc: { 'views.count': 1 } },
        { returnDocument: 'after' },
    );

    return article;
};

articleSchema.statics.like = async function (id, userId) {
    await this.findOneAndUpdate(
        { _id: id },
        { $push: { 'likes.users': userId }, $inc: { 'likes.count': 1 } },
        { returnDocument: 'after' },
    );

    return;
};

articleSchema.statics.removeLike = async function (id, userId) {
    await this.findOneAndUpdate(
        { _id: id },
        { $pull: { 'likes.users': userId }, $inc: { 'likes.count': -1 } },
        { returnDocument: 'after' },
    );

    return;
};

module.exports = model('Article', articleSchema);
