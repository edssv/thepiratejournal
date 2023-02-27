const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    title: { type: String, required: true },
    searchTitle: { type: String, required: true },
    description: { type: String },
    cover: { type: String, required: true },
    blocks: { type: Array, required: true },

    tags: [{ type: String }],
    category: {
        name: { type: String, required: true },
        game: { type: String },
        key: { type: String, required: true },
    },
    readingTime: { type: Number, required: true },
    author: {
        _id: { type: ObjectId, required: true },
        username: { type: String, required: true },
    },
    createdAt: { type: Number, default: new Date(), required: true },
    updatedAt: { type: Number, default: new Date(), required: true },
    comments: [{ type: Object }],
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    likesUsers: [{ type: ObjectId }],
    isPublished: Boolean,
    isDeleted: Boolean,
});

articleSchema.statics.creating = async function (authorId, authorUsername, articleData) {
    const article = await this.create({
        title: articleData.title,
        description: articleData.description,
        searchTitle: articleData.title.toLowerCase(),
        cover: articleData.cover,
        blocks: articleData.blocks,
        tags: articleData.tags,
        category: articleData.category,
        readingTime: articleData.readingTime,
        author: { _id: authorId, username: authorUsername },
        isPublished: false,
    });

    return article;
};

articleSchema.statics.editing = async function (
    articleId,
    title,
    description,
    cover,
    blocks,
    tags,
    category,
    readingTime
) {
    if (!title || !cover || !blocks) {
        throw Error('Заголовок обложка и блоки обязательны.');
    }

    const article = await this.updateOne(
        { _id: articleId },
        {
            title: title,
            description: description,
            searchTitle: title.toLowerCase(),
            cover: cover,
            blocks: blocks,
            tags: tags,
            category: category,
            readingTime: readingTime,
            updatedAt: new Date(),
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
        searchTitle: { $regex: query.search ? query.search.toLowerCase() : '' },
    };

    const findParams = {
        $and: [categoryParams, searchParams, query.tag ? { tags: query.tag } : {}, { isPublished: true }],
    };

    const sortParams =
        query.sort === 'recent'
            ? { createdAt: -1 }
            : query.sort === 'appreciations'
            ? { likesCount: -1 }
            : { viewsCount: -1 };

    const articles = await this.find(findParams).sort(sortParams);

    return articles;
};

articleSchema.statics.getOne = async function (id) {
    const article = await this.findOneAndUpdate(
        { _id: id, isPublished: true },
        { $inc: { viewsCount: 1 } },
        { returnDocument: 'after' }
    );

    if (!article) return;

    return { ...article._doc, comments: { totalCount: article.comments.length } };
};

articleSchema.statics.getComments = async function (articleId, query) {
    const { comments } = await this.findOne({ _id: articleId }, { comments: 1, _id: 0 });
    const totalCount = comments.length ?? 0;

    const skip = query.page * query.limit;
    // const comments = article.comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
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
        { $push: { likesUsers: userId }, $inc: { likesCount: 1 } },
        { returnDocument: 'after' }
    );

    return article;
};

articleSchema.statics.removeLike = async function (id, userId) {
    await this.findOneAndUpdate(
        { _id: id },
        { $pull: { likesUsers: userId }, $inc: { likesCount: -1 } },
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
};

module.exports = model('Article', articleSchema);
