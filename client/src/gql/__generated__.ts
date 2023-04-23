// NOTICE: __generated__ folders should be added to .gitignore
// In this repo I keep generated files only for demo purposes!
import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Article = {
  body: Array<Block>;
  category: Scalars['String'];
  comments: Scalars['String'];
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  likes: Array<Like>;
  readingTime: Scalars['Float'];
  searchTitle: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  viewsCount: Scalars['Float'];
};

export type Auth = {
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Block = {
  data: BlockData;
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type BlockData = {
  caption?: Maybe<Scalars['String']>;
  embed?: Maybe<Scalars['String']>;
  file?: Maybe<FileData>;
  height?: Maybe<Scalars['Float']>;
  items?: Maybe<Array<Scalars['String']>>;
  level?: Maybe<Scalars['Float']>;
  service?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  stretched?: Maybe<Scalars['Boolean']>;
  style?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  withBackground?: Maybe<Scalars['Boolean']>;
  withBorder?: Maybe<Scalars['Boolean']>;
};

export type Blog = {
  body: Array<Block>;
  category: Scalars['String'];
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  isPublished: Scalars['Boolean'];
  likesCount: Scalars['Float'];
  readingTime: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  viewsCount: Scalars['Float'];
};

export type Bookmark = {
  article: Article;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: User;
};

export type CreateArticleInput = {
  body: Array<InputBlock>;
  category: Scalars['String'];
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId?: InputMaybe<Scalars['Float']>;
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateBlogInput = {
  body: Array<InputBlock>;
  category?: InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId?: InputMaybe<Scalars['Float']>;
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateDraftInput = {
  body?: InputMaybe<Array<InputBlock>>;
  category?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Draft = {
  body?: Maybe<Array<Block>>;
  category?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type EmailLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FileData = {
  ref?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Follower = {
  createdAt: Scalars['DateTime'];
  followingTo: Array<User>;
  id: Scalars['ID'];
  user: Array<User>;
};

export type InputBlock = {
  data: InputBlockData;
  id: Scalars['ID'];
  type: Scalars['String'];
};

export type InputBlockData = {
  caption?: InputMaybe<Scalars['String']>;
  embed?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<InputFileData>;
  height?: InputMaybe<Scalars['Float']>;
  items?: InputMaybe<Array<Scalars['String']>>;
  level?: InputMaybe<Scalars['Float']>;
  service?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  stretched?: InputMaybe<Scalars['Boolean']>;
  style?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
  withBackground?: InputMaybe<Scalars['Boolean']>;
  withBorder?: InputMaybe<Scalars['Boolean']>;
};

export type InputFileData = {
  ref?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Like = {
  article: Article;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: User;
};

export type Mutation = {
  createArticle: Article;
  createBlog: Blog;
  createDraft: Draft;
  createLike: Scalars['ID'];
  login: Auth;
  removeArticle: Article;
  removeBlog: Blog;
  removeDraft: Draft;
  removeLike: Scalars['ID'];
  signup: Auth;
  updateArticle: Article;
  updateBlog: Blog;
  updateDraft: Draft;
};


export type MutationcreateArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationcreateBlogArgs = {
  createBlogInput: CreateBlogInput;
};


export type MutationcreateDraftArgs = {
  createDraftInput: CreateDraftInput;
};


export type MutationcreateLikeArgs = {
  articleId: Scalars['Float'];
};


export type MutationloginArgs = {
  loginInput: EmailLoginInput;
};


export type MutationremoveArticleArgs = {
  id: Scalars['Float'];
};


export type MutationremoveBlogArgs = {
  id: Scalars['Float'];
};


export type MutationremoveDraftArgs = {
  id: Scalars['Float'];
};


export type MutationremoveLikeArgs = {
  articleId: Scalars['Float'];
};


export type MutationsignupArgs = {
  signupInput: SignUpInput;
};


export type MutationupdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationupdateBlogArgs = {
  updateBlogInput: UpdateBlogInput;
};


export type MutationupdateDraftArgs = {
  updateDraftInput: UpdateDraftInput;
};

export type Query = {
  getAllArticles: Array<Article>;
  getAllBlog: Array<Blog>;
  getArticle: Article;
  getAuthorChoiceArticles: Array<Article>;
  getBestOfWeekArticles: Array<Article>;
  getDraft: Draft;
  getNewestArticles: Array<Article>;
  getNextArticles: Array<Article>;
  getNextBlogs: Array<Blog>;
  getOneBlog: Blog;
  getUser: User;
  getUserContent?: Maybe<Array<Article>>;
};


export type QuerygetArticleArgs = {
  id: Scalars['Float'];
};


export type QuerygetDraftArgs = {
  id: Scalars['Float'];
};


export type QuerygetNextArticlesArgs = {
  id: Scalars['Float'];
};


export type QuerygetNextBlogsArgs = {
  id: Scalars['Float'];
};


export type QuerygetOneBlogArgs = {
  id: Scalars['Float'];
};


export type QuerygetUserArgs = {
  id: Scalars['Float'];
};


export type QuerygetUserContentArgs = {
  articles: Scalars['String'];
  id: Scalars['Float'];
};

export type SignUpInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UpdateArticleInput = {
  body: Array<InputBlock>;
  category: Scalars['String'];
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type UpdateBlogInput = {
  body: Array<InputBlock>;
  category?: InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type UpdateDraftInput = {
  body?: InputMaybe<Array<InputBlock>>;
  category?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  articles?: Maybe<Array<Article>>;
  bookmarks?: Maybe<Array<Bookmark>>;
  createdAt: Scalars['DateTime'];
  drafts?: Maybe<Array<Draft>>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Follower>>;
  following?: Maybe<Array<Follower>>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Like>>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type RemoveDraftMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveDraftMutation = { __typename: 'Mutation', removeDraft: { __typename: 'Draft', id: string } };

export type ArticlePreview = { __typename: 'Article', id: string, title: string, description: string, cover: string };

export type RemoveArticleMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveArticleMutation = { __typename: 'Mutation', removeArticle: { __typename: 'Article', id: string } };

export type ArticleQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ArticleQuery = { __typename: 'Query', getArticle: { __typename: 'Article', id: string, title: string, description: string, cover: string, readingTime: number, createdAt: any, tags?: Array<string> | null, category: string, body: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }>, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type BlogQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type BlogQuery = { __typename: 'Query', getOneBlog: { __typename: 'Blog', id: string, title: string, description: string, cover: string, readingTime: number, createdAt: any, category: string, tags?: Array<string> | null, body: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, source?: string | null, embed?: string | null, width?: number | null, height?: number | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }>, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type CreateLikeMutationVariables = Exact<{
  articleId: Scalars['Float'];
}>;


export type CreateLikeMutation = { __typename: 'Mutation', createLike: string };

export type RemoveLikeMutationVariables = Exact<{
  articleId: Scalars['Float'];
}>;


export type RemoveLikeMutation = { __typename: 'Mutation', removeLike: string };

export type NextArticlesQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type NextArticlesQuery = { __typename: 'Query', getNextArticles: Array<{ __typename: 'Article', id: string, title: string, cover: string, category: string }> };

export type NextBlogsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type NextBlogsQuery = { __typename: 'Query', getNextBlogs: Array<{ __typename: 'Blog', id: string, title: string, cover: string, category: string }> };

export type LoginMutationVariables = Exact<{
  loginInput: EmailLoginInput;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'Auth', accessToken: string, refreshToken: string, user: { __typename: 'User', id: string, username: string, image?: string | null, role: string, emailVerified: boolean } } };

export type SignupMutationVariables = Exact<{
  signupInput: SignUpInput;
}>;


export type SignupMutation = { __typename: 'Mutation', signup: { __typename: 'Auth', accessToken: string, refreshToken: string, user: { __typename: 'User', id: string, username: string, image?: string | null, role: string, emailVerified: boolean } } };

export type BlogListQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogListQuery = { __typename: 'Query', getAllBlog: Array<{ __typename: 'Blog', id: string, title: string, description: string, cover: string, createdAt: any }> };

export type CreateArticleMutationVariables = Exact<{
  createArticleInput: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename: 'Mutation', createArticle: { __typename: 'Article', id: string } };

export type CreateBlogMutationVariables = Exact<{
  createBlogInput: CreateBlogInput;
}>;


export type CreateBlogMutation = { __typename: 'Mutation', createBlog: { __typename: 'Blog', id: string } };

export type UpdateArticleMutationVariables = Exact<{
  updateArticleInput: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename: 'Mutation', updateArticle: { __typename: 'Article', id: string } };

export type UpdateBlogMutationVariables = Exact<{
  updateBlogInput: UpdateBlogInput;
}>;


export type UpdateBlogMutation = { __typename: 'Mutation', updateBlog: { __typename: 'Blog', id: string } };

export type DraftQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DraftQuery = { __typename: 'Query', getDraft: { __typename: 'Draft', id: string, title?: string | null, description?: string | null, cover?: string | null, createdAt: any, body?: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }> | null, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type CreateDraftMutationVariables = Exact<{
  createDraftInput: CreateDraftInput;
}>;


export type CreateDraftMutation = { __typename: 'Mutation', createDraft: { __typename: 'Draft', id: string } };

export type UpdateDraftMutationVariables = Exact<{
  updateDraftInput: UpdateDraftInput;
}>;


export type UpdateDraftMutation = { __typename: 'Mutation', updateDraft: { __typename: 'Draft', id: string } };

export type ArticlesListQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesListQuery = { __typename: 'Query', getAllArticles: Array<{ __typename: 'Article', id: string, title: string, description: string, cover: string }> };

export type HomeSignedOutQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeSignedOutQuery = { __typename: 'Query', getAuthorChoiceArticles: Array<{ __typename: 'Article', id: string, title: string, description: string, cover: string }>, getBestOfWeekArticles: Array<{ __typename: 'Article', id: string, title: string, description: string, cover: string }>, getNewestArticles: Array<{ __typename: 'Article', id: string, title: string, description: string, cover: string }> };

export type UserQueryVariables = Exact<{
  id: Scalars['Float'];
  articles: Scalars['String'];
}>;


export type UserQuery = { __typename: 'Query', getUser: { __typename: 'User', id: string, username: string, image?: string | null, createdAt: any, followers?: Array<{ __typename: 'Follower', id: string }> | null }, getUserContent?: Array<{ __typename: 'Article', id: string, title: string, cover: string, viewsCount: number, user: { __typename: 'User', id: string, username: string } }> | null };

export const ArticlePreview = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArticlePreview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]} as unknown as DocumentNode;
export const RemoveDraftMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDraftMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type RemoveDraftMutationMutationFn = Apollo.MutationFunction<RemoveDraftMutation, RemoveDraftMutationVariables>;

/**
 * __useRemoveDraftMutation__
 *
 * To run a mutation, you first call `useRemoveDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDraftMutation, { data, loading, error }] = useRemoveDraftMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveDraftMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDraftMutation, RemoveDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDraftMutation, RemoveDraftMutationVariables>(RemoveDraftMutationDocument, options);
      }
export type RemoveDraftMutationHookResult = ReturnType<typeof useRemoveDraftMutation>;
export type RemoveDraftMutationMutationResult = Apollo.MutationResult<RemoveDraftMutation>;
export type RemoveDraftMutationMutationOptions = Apollo.BaseMutationOptions<RemoveDraftMutation, RemoveDraftMutationVariables>;
export const RemoveArticleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveArticleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type RemoveArticleMutationMutationFn = Apollo.MutationFunction<RemoveArticleMutation, RemoveArticleMutationVariables>;

/**
 * __useRemoveArticleMutation__
 *
 * To run a mutation, you first call `useRemoveArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeArticleMutation, { data, loading, error }] = useRemoveArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveArticleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveArticleMutation, RemoveArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveArticleMutation, RemoveArticleMutationVariables>(RemoveArticleMutationDocument, options);
      }
export type RemoveArticleMutationHookResult = ReturnType<typeof useRemoveArticleMutation>;
export type RemoveArticleMutationMutationResult = Apollo.MutationResult<RemoveArticleMutation>;
export type RemoveArticleMutationMutationOptions = Apollo.BaseMutationOptions<RemoveArticleMutation, RemoveArticleMutationVariables>;
export const ArticleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"stretched"}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}},{"kind":"Field","name":{"kind":"Name","value":"withBorder"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"readingTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleQueryDocument, options);
      }
export function useArticleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleQueryDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleQueryLazyQueryHookResult = ReturnType<typeof useArticleQueryLazyQuery>;
export type ArticleQueryQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const BlogQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlogQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOneBlog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"stretched"}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}},{"kind":"Field","name":{"kind":"Name","value":"withBorder"}},{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"embed"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"readingTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlogQuery(baseOptions: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogQueryDocument, options);
      }
export function useBlogQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(BlogQueryDocument, options);
        }
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogQueryLazyQueryHookResult = ReturnType<typeof useBlogQueryLazyQuery>;
export type BlogQueryQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
export const CreateLikeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLikeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"articleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}}]}]}}]} as unknown as DocumentNode;
export type CreateLikeMutationMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeMutationDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const RemoveLikeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveLikeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"articleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}}]}]}}]} as unknown as DocumentNode;
export type RemoveLikeMutationMutationFn = Apollo.MutationFunction<RemoveLikeMutation, RemoveLikeMutationVariables>;

/**
 * __useRemoveLikeMutation__
 *
 * To run a mutation, you first call `useRemoveLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLikeMutation, { data, loading, error }] = useRemoveLikeMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useRemoveLikeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLikeMutation, RemoveLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLikeMutation, RemoveLikeMutationVariables>(RemoveLikeMutationDocument, options);
      }
export type RemoveLikeMutationHookResult = ReturnType<typeof useRemoveLikeMutation>;
export type RemoveLikeMutationMutationResult = Apollo.MutationResult<RemoveLikeMutation>;
export type RemoveLikeMutationMutationOptions = Apollo.BaseMutationOptions<RemoveLikeMutation, RemoveLikeMutationVariables>;
export const NextArticlesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextArticlesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNextArticles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useNextArticlesQuery__
 *
 * To run a query within a React component, call `useNextArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextArticlesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNextArticlesQuery(baseOptions: Apollo.QueryHookOptions<NextArticlesQuery, NextArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NextArticlesQuery, NextArticlesQueryVariables>(NextArticlesQueryDocument, options);
      }
export function useNextArticlesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NextArticlesQuery, NextArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NextArticlesQuery, NextArticlesQueryVariables>(NextArticlesQueryDocument, options);
        }
export type NextArticlesQueryHookResult = ReturnType<typeof useNextArticlesQuery>;
export type NextArticlesQueryLazyQueryHookResult = ReturnType<typeof useNextArticlesQueryLazyQuery>;
export type NextArticlesQueryQueryResult = Apollo.QueryResult<NextArticlesQuery, NextArticlesQueryVariables>;
export const NextBlogsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NextBlogsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNextBlogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useNextBlogsQuery__
 *
 * To run a query within a React component, call `useNextBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextBlogsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNextBlogsQuery(baseOptions: Apollo.QueryHookOptions<NextBlogsQuery, NextBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NextBlogsQuery, NextBlogsQueryVariables>(NextBlogsQueryDocument, options);
      }
export function useNextBlogsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NextBlogsQuery, NextBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NextBlogsQuery, NextBlogsQueryVariables>(NextBlogsQueryDocument, options);
        }
export type NextBlogsQueryHookResult = ReturnType<typeof useNextBlogsQuery>;
export type NextBlogsQueryLazyQueryHookResult = ReturnType<typeof useNextBlogsQueryLazyQuery>;
export type NextBlogsQueryQueryResult = Apollo.QueryResult<NextBlogsQuery, NextBlogsQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode;
export type LoginMutationMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginMutationDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}}]}}]}}]}}]} as unknown as DocumentNode;
export type SignupMutationMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupInput: // value for 'signupInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupMutationDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const BlogListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlogListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllBlog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useBlogListQuery__
 *
 * To run a query within a React component, call `useBlogListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogListQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlogListQuery(baseOptions?: Apollo.QueryHookOptions<BlogListQuery, BlogListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogListQuery, BlogListQueryVariables>(BlogListQueryDocument, options);
      }
export function useBlogListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogListQuery, BlogListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogListQuery, BlogListQueryVariables>(BlogListQueryDocument, options);
        }
export type BlogListQueryHookResult = ReturnType<typeof useBlogListQuery>;
export type BlogListQueryLazyQueryHookResult = ReturnType<typeof useBlogListQueryLazyQuery>;
export type BlogListQueryQueryResult = Apollo.QueryResult<BlogListQuery, BlogListQueryVariables>;
export const CreateArticleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateArticleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createArticleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateArticleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createArticleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createArticleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type CreateArticleMutationMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      createArticleInput: // value for 'createArticleInput'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleMutationDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const CreateBlogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBlogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBlogInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBlogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBlog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBlogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBlogInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type CreateBlogMutationMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      createBlogInput: // value for 'createBlogInput'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogMutationDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const UpdateArticleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateArticleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateArticleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateArticleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateArticleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateArticleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type UpdateArticleMutationMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      updateArticleInput: // value for 'updateArticleInput'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleMutationDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const UpdateBlogMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBlogMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBlogInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBlogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBlog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBlogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBlogInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type UpdateBlogMutationMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      updateBlogInput: // value for 'updateBlogInput'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogMutationDocument, options);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const DraftQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DraftQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"stretched"}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}},{"kind":"Field","name":{"kind":"Name","value":"withBorder"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useDraftQuery__
 *
 * To run a query within a React component, call `useDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDraftQuery(baseOptions: Apollo.QueryHookOptions<DraftQuery, DraftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftQuery, DraftQueryVariables>(DraftQueryDocument, options);
      }
export function useDraftQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftQuery, DraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftQuery, DraftQueryVariables>(DraftQueryDocument, options);
        }
export type DraftQueryHookResult = ReturnType<typeof useDraftQuery>;
export type DraftQueryLazyQueryHookResult = ReturnType<typeof useDraftQueryLazyQuery>;
export type DraftQueryQueryResult = Apollo.QueryResult<DraftQuery, DraftQueryVariables>;
export const CreateDraftMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDraftMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDraftInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDraftInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDraftInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDraftInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type CreateDraftMutationMutationFn = Apollo.MutationFunction<CreateDraftMutation, CreateDraftMutationVariables>;

/**
 * __useCreateDraftMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutation, { data, loading, error }] = useCreateDraftMutation({
 *   variables: {
 *      createDraftInput: // value for 'createDraftInput'
 *   },
 * });
 */
export function useCreateDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutation, CreateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftMutationDocument, options);
      }
export type CreateDraftMutationHookResult = ReturnType<typeof useCreateDraftMutation>;
export type CreateDraftMutationMutationResult = Apollo.MutationResult<CreateDraftMutation>;
export type CreateDraftMutationMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutation, CreateDraftMutationVariables>;
export const UpdateDraftMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDraftMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDraftInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDraftInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDraft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateDraftInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDraftInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode;
export type UpdateDraftMutationMutationFn = Apollo.MutationFunction<UpdateDraftMutation, UpdateDraftMutationVariables>;

/**
 * __useUpdateDraftMutation__
 *
 * To run a mutation, you first call `useUpdateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDraftMutation, { data, loading, error }] = useUpdateDraftMutation({
 *   variables: {
 *      updateDraftInput: // value for 'updateDraftInput'
 *   },
 * });
 */
export function useUpdateDraftMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDraftMutation, UpdateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDraftMutation, UpdateDraftMutationVariables>(UpdateDraftMutationDocument, options);
      }
export type UpdateDraftMutationHookResult = ReturnType<typeof useUpdateDraftMutation>;
export type UpdateDraftMutationMutationResult = Apollo.MutationResult<UpdateDraftMutation>;
export type UpdateDraftMutationMutationOptions = Apollo.BaseMutationOptions<UpdateDraftMutation, UpdateDraftMutationVariables>;
export const ArticlesListQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticlesListQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useArticlesListQuery__
 *
 * To run a query within a React component, call `useArticlesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesListQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesListQuery, ArticlesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesListQuery, ArticlesListQueryVariables>(ArticlesListQueryDocument, options);
      }
export function useArticlesListQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesListQuery, ArticlesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesListQuery, ArticlesListQueryVariables>(ArticlesListQueryDocument, options);
        }
export type ArticlesListQueryHookResult = ReturnType<typeof useArticlesListQuery>;
export type ArticlesListQueryLazyQueryHookResult = ReturnType<typeof useArticlesListQueryLazyQuery>;
export type ArticlesListQueryQueryResult = Apollo.QueryResult<ArticlesListQuery, ArticlesListQueryVariables>;
export const HomeSignedOutQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeSignedOutQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthorChoiceArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getBestOfWeekArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}},{"kind":"Field","name":{"kind":"Name","value":"getNewestArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useHomeSignedOutQuery__
 *
 * To run a query within a React component, call `useHomeSignedOutQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeSignedOutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeSignedOutQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeSignedOutQuery(baseOptions?: Apollo.QueryHookOptions<HomeSignedOutQuery, HomeSignedOutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeSignedOutQuery, HomeSignedOutQueryVariables>(HomeSignedOutQueryDocument, options);
      }
export function useHomeSignedOutQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeSignedOutQuery, HomeSignedOutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeSignedOutQuery, HomeSignedOutQueryVariables>(HomeSignedOutQueryDocument, options);
        }
export type HomeSignedOutQueryHookResult = ReturnType<typeof useHomeSignedOutQuery>;
export type HomeSignedOutQueryLazyQueryHookResult = ReturnType<typeof useHomeSignedOutQueryLazyQuery>;
export type HomeSignedOutQueryQueryResult = Apollo.QueryResult<HomeSignedOutQuery, HomeSignedOutQueryVariables>;
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articles"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getUserContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"articles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articles"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"viewsCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      articles: // value for 'articles'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserQueryDocument, options);
      }
export function useUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserQueryDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<typeof useUserQueryLazyQuery>;
export type UserQueryQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;