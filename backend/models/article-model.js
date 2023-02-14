const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    isPublished: Boolean,
    isDeleted: Boolean,
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
        name: {
            type: String,
            required: true,
        },
        game: {
            type: String,
        },
        key: {
            type: String,
            required: true,
        },
    },
    reading_time: { type: Number, required: true },
    created_on: { type: Number, required: true },
    comments: [
        {
            type: Object,
            required: true,
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
    readingTime
) {
    const article = await this.create({
        isPublished: false,
        author: { _id: authorId, username: authorUsername },
        title,
        search_title: title.toLowerCase(),
        cover,
        blocks,
        tags: tags,
        category: category,
        reading_time: readingTime,
        created_on: new Date(),
    });

    return article;
};

articleSchema.statics.editing = async function (articleId, title, cover, blocks, tags, category, readingTime) {
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
            reading_time: readingTime,
        }
    );

    return article;
};

articleSchema.statics.getAll = async function (section, currentUser) {
    if (section === 'following') {
        const followList = currentUser.follow;
        const articles = await this.find({
            $and: [{ 'author._id': { $in: followList } }, { isPublished: true }],
        });

        return articles;
    }

    if (section === 'for_you') {
        const articles = await this.find({ isPublished: true }).exec();

        return articles;
    }
};

articleSchema.statics.searchArticles = async function (categoryName, query) {
    const categoryParams = {
        'category.key': categoryName && categoryName !== 'all' ? categoryName : { $type: 'string' },
    };
    const searchParams = {
        search_title: { $regex: query.search ? query.search.toLowerCase() : '' },
    };

    const findParams = { $and: [categoryParams, searchParams, { isPublished: true }] };
    const sortParams =
        query.sort === 'recent'
            ? { created_on: -1 }
            : query.sort === 'appreciations'
            ? { 'likes.count': -1 }
            : { 'views.count': -1 };

    const articles = await this.find(findParams).sort(sortParams);

    return articles;
};

articleSchema.statics.getOne = async function (id) {
    const article = await this.findOneAndUpdate(
        { _id: id, isPublished: true },
        { $inc: { 'views.count': 1 } },
        { returnDocument: 'after' }
    );

    return { ...article._doc, comments: { totalCount: article.comments.length } };
};

articleSchema.statics.getComments = async function (articleId, query) {
    const { comments } = await this.findOne({ _id: articleId }, { comments: 1, _id: 0 });
    const totalCount = comments.length ?? 0;

    const skip = query.page * query.limit;
    // const comments = article.comments.sort((a, b) => (a.created_on > b.created_on ? -1 : 1));
    const limitComments = comments.slice(skip, Number(skip) + Number(query.limit));

    return { limitComments, totalCount };
};

articleSchema.statics.getSuggestions = async function (articleId, categoryName, query) {
    const findParams = {
        $and: [{ isPublished: true }],
    };

    const articles = await this.find(findParams);
    const filterArticles = articles.filter((item) => item._id.toString() !== articleId);
    const totalCount = filterArticles.length;

    const skip = query.page * query.limit;

    const limitArticles = filterArticles.slice(skip, Number(skip) + Number(query.limit));

    return { limitArticles, totalCount };
};

articleSchema.statics.like = async function (id, userId) {
    const article = await this.findOneAndUpdate(
        { _id: id },
        { $push: { 'likes.users': userId }, $inc: { 'likes.count': 1 } },
        { returnDocument: 'after' }
    );

    return article;
};

articleSchema.statics.removeLike = async function (id, userId) {
    await this.findOneAndUpdate(
        { _id: id },
        { $pull: { 'likes.users': userId }, $inc: { 'likes.count': -1 } },
        { returnDocument: 'after' }
    );
};

articleSchema.statics.addComment = async function (articleId, commentId) {
    const article = await this.findOneAndUpdate(
        { _id: articleId },
        { $push: { comments: commentId } },
        { returnDocument: 'after' }
    );

    return article;
};

articleSchema.statics.removeComment = async function (articleId, commentId) {
    const article = await this.findOneAndUpdate(
        { _id: articleId },
        { $pull: { comments: ObjectId(commentId) } },
        { returnDocument: 'after' }
    );
    return article;
};

articleSchema.statics.likeComment = async function (articleId, userId, commentId) {
    const { comments } = await this.findOne({ _id: articleId }, { comments: 1, _id: 0 });

    const necessaryComment = comments.find((item) => item._id.toString() === commentId);

    necessaryComment.likes.push(userId);

    // await this.findOneAndUpdate(
    //     { _id: articleId },
    //     { $push: { comments: { $elemMatch: { _id: commentId: {necessaryComment} }} } },
    //     { returnDocument: 'after' },
    // );
};

module.exports = model('Article', articleSchema);
