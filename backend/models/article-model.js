const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    author: {
        _id: { type: String, required: true },
        username: { type: String, required: true },
    },
    title: { type: String, required: true },
    search_title: { type: String, required: true },
    cover: {
        type: String,
        required: true,
    },
    blocks: {
        type: Array,
        required: true,
    },
    tags: [{ type: String, required: true }],
    category: {
        category_name: {
            type: String,
            required: true,
        },
        game: {
            type: String,
        },
    },
    created_on: { type: Number, required: true },
    comments: [
        {
            author: { type: String, required: true },
            text: { type: String, required: true },
            created_on: { type: Number, required: true },
        },
    ],
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
    tags,
    category,
) {
    const article = await this.create({
        author: { _id: authorId, username: authorUsername },
        title,
        search_title: title.toLowerCase(),
        cover,
        blocks,
        tags: tags,
        category: { category_name: category.category_name, game: category.game },
        created_on: new Date(),
    });

    return article;
};

articleSchema.statics.editing = async function (articleId, title, cover, blocks, tags, category) {
    if (!title || !cover || !blocks) {
        throw Error('Заголовок обложка и блоки обязательны.');
    }

    const article = await this.updateOne(
        { _id: articleId },
        {
            title: title,
            search_title: title.toLowerCase(),
            cover: cover,
            blocks: blocks,
            tags: tags,
            category: category,
        },
    );

    return article;
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
    const categoryParams = {
        'category.category_name': categoryName ? categoryName : { $type: 'string' },
    };
    const searchParams = {
        search_title: { $regex: searchValue ? searchValue.toLowerCase() : '' },
    };
    const findParams = { $and: [categoryParams, searchParams] };
    const sortParams =
        sortType === 'recent'
            ? { created_on: -1 }
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
    // const comments = article.comments.map(async (item) => {
    //     await userModel.find({ _id: item.author });
    // });

    const comments = article.comments.sort((a, b) => (a.created_on > b.created_on ? -1 : 1));

    return { ...article._doc, comments: comments };
};

articleSchema.statics.like = async function (id, userId) {
    const article = await this.findOneAndUpdate(
        { _id: id },
        { $push: { 'likes.users': userId }, $inc: { 'likes.count': 1 } },
        { returnDocument: 'after' },
    );

    return article;
};

articleSchema.statics.removeLike = async function (id, userId) {
    await this.findOneAndUpdate(
        { _id: id },
        { $pull: { 'likes.users': userId }, $inc: { 'likes.count': -1 } },
        { returnDocument: 'after' },
    );
};

articleSchema.statics.addComment = async function (id, userId, commentText) {
    if (!commentText) {
        throw new Error('Комментарий пустой.');
    }

    const article = await this.findOneAndUpdate(
        { _id: id },
        { $push: { comments: { author: userId, text: commentText, created_on: new Date() } } },
        { returnDocument: 'after' },
    );

    return article;
};

articleSchema.statics.removeComment = async function (id, userId, commentId) {
    const article = await this.findOneAndUpdate(
        { _id: id },
        { $pull: { comments: { _id: commentId } } },
        { returnDocument: 'after' },
    );

    return article;
};

module.exports = model('Article', articleSchema);
