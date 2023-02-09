import { createSlice } from '@reduxjs/toolkit';
import { Article, articleApi, userApi } from '../services';
import type { RootState } from '../store';

type ArticleState = {
    article: Article;
    mutableArticle: Article;
};

const slice = createSlice({
    name: 'article',
    initialState: {
        article: {},
        mutableArticle: {
            _id: '',
            title: '',
            cover: '',
            blocks: [],
            tags: [],
            category: { name: '', game: '', key: '' },
        },
    } as ArticleState,
    reducers: {
        setLike: (state, { payload }) => {
            state.article.viewer.isLike = payload;
        },
        resetMutableArticle: (state, { payload }) => {
            state.mutableArticle = payload;
        },
        setTitle: (state, { payload }) => {
            state.mutableArticle.title = payload;
        },
        setCover: (state, { payload }) => {
            state.mutableArticle.cover = payload;
        },
        setBlocks: (state, { payload }) => {
            console.log(payload.blocks);
            state.mutableArticle.blocks = [...payload?.blocks];
        },
        setTags: (state, { payload }) => {
            state.mutableArticle.tags = payload;
        },
        setArticleCategory: (state, { payload }) => {
            state.mutableArticle.category = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // get article
            .addMatcher(articleApi.endpoints.getArticle.matchFulfilled, (state, { payload }) => {
                state.article = payload;
                state.mutableArticle.blocks = payload.blocks;
            })

            // get comments
            .addMatcher(articleApi.endpoints.getComments.matchFulfilled, (state, { payload }) => {
                const comments = state.article.comments.list ?? [];

                state.article.comments = {
                    list: [...comments, ...payload.commentsList],
                    totalCount: payload.totalCount,
                };
            })

            // get suggestions
            .addMatcher(articleApi.endpoints.getSuggestions.matchFulfilled, (state, { payload }) => {
                const articles = state.article.suggestions?.articles ?? [];
                const categoryName = payload.categoryName ?? '';

                state.article.suggestions = {
                    articles: {
                        all:
                            categoryName === 'all'
                                ? {
                                      list: [...(articles?.all?.list ?? []), ...payload.articles],
                                      totalCount: payload.totalCount,
                                  }
                                : {
                                      list: [...(articles?.all?.list ?? [])],
                                      totalCount: articles.all?.totalCount,
                                  },

                        similar:
                            categoryName === 'similar'
                                ? {
                                      list: [...(articles?.similar?.list ?? []), ...payload.articles],
                                      totalCount: payload.totalCount,
                                  }
                                : {
                                      list: [...(articles?.similar?.list ?? [])],
                                      totalCount: articles.similar?.totalCount,
                                  },
                    },
                };
            })

            // get mutable article
            .addMatcher(articleApi.endpoints.getMutableArticle.matchFulfilled, (state, { payload }) => {
                state.mutableArticle = payload;
            })

            // like
            .addMatcher(articleApi.endpoints.like.matchFulfilled, (state) => {
                state.article.viewer.isLike = true;
                state.article.likes.count += 1;
            })
            .addMatcher(articleApi.endpoints.removeLike.matchFulfilled, (state) => {
                state.article.viewer.isLike = false;
                state.article.likes.count -= 1;
            })

            // bookmark
            .addMatcher(userApi.endpoints.addBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = true;
            })
            .addMatcher(userApi.endpoints.removeBookmark.matchFulfilled, (state) => {
                state.article.viewer.hasBookmark = false;
            })

            // comments
            .addMatcher(articleApi.endpoints.addComment.matchFulfilled, (state, { payload }) => {
                state.article.comments.list.unshift(payload);
                state.article.comments.totalCount += 1;
            })
            .addMatcher(articleApi.endpoints.removeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                state.article.comments.list.splice(commentIndex, 1);
                state.article.comments.totalCount -= 1;
            })
            // like comment
            .addMatcher(articleApi.endpoints.likeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                const likesCount = state.article.comments.list[commentIndex].comment.likes.count;
                state.article.comments.list[commentIndex].viewer.isLike = true;

                if (!likesCount) {
                    state.article.comments.list[commentIndex].comment.likes.count = 1;
                } else {
                    state.article.comments.list[commentIndex].comment.likes.count += 1;
                }
            })
            // remove like comment
            .addMatcher(articleApi.endpoints.removeLikeComment.matchFulfilled, (state, action) => {
                const commentIndex = action.meta.arg.originalArgs.index;
                state.article.comments.list[commentIndex].viewer.isLike = false;
                state.article.comments.list[commentIndex].comment.likes.count -= 1;
            });
    },
});

export const { setLike, resetMutableArticle, setTitle, setCover, setBlocks, setTags, setArticleCategory } =
    slice.actions;

export default slice.reducer;

export const selectArticle = (state: RootState) => state.article.article;
export const selectMutableArticle = (state: RootState) => state.article.mutableArticle;
