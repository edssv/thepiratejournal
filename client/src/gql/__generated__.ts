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
  DateTime: any;
};

export type Article = {
  __typename: 'Article';
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
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  viewsCount: Scalars['Float'];
};

export type Auth = {
  __typename: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Block = {
  __typename: 'Block';
  data: BlockData;
  id: Scalars['String'];
  type: Scalars['String'];
};

export type BlockData = {
  __typename: 'BlockData';
  caption?: Maybe<Scalars['String']>;
  file?: Maybe<FileData>;
  items?: Maybe<Array<Scalars['String']>>;
  level?: Maybe<Scalars['Float']>;
  stretched?: Maybe<Scalars['Boolean']>;
  style?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  withBackground?: Maybe<Scalars['Boolean']>;
  withBorder?: Maybe<Scalars['Boolean']>;
};

export type Blog = {
  __typename: 'Blog';
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
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  viewsCount: Scalars['Float'];
};

export type Bookmark = {
  __typename: 'Bookmark';
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
  tags?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateBlogInput = {
  body: Array<InputBlock>;
  category?: InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId: Scalars['Float'];
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Draft = {
  __typename: 'Draft';
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
  __typename: 'FileData';
  ref?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Follower = {
  __typename: 'Follower';
  createdAt: Scalars['DateTime'];
  followingTo: Array<User>;
  id: Scalars['ID'];
  user: Array<User>;
};

export type InputBlock = {
  data: InputBlockData;
  id: Scalars['String'];
  type: Scalars['String'];
};

export type InputBlockData = {
  caption?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<InputFileData>;
  items?: InputMaybe<Array<Scalars['String']>>;
  level?: InputMaybe<Scalars['Float']>;
  stretched?: InputMaybe<Scalars['Boolean']>;
  style?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  withBackground?: InputMaybe<Scalars['Boolean']>;
  withBorder?: InputMaybe<Scalars['Boolean']>;
};

export type InputFileData = {
  ref?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Like = {
  __typename: 'Like';
  article: Article;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  user: User;
};

export type Mutation = {
  __typename: 'Mutation';
  createArticle: Article;
  createBlog: Blog;
  login: Auth;
  removeArticle: Article;
  removeBlog: Blog;
  signup: Auth;
  updateArticle: Article;
  updateBlog: Blog;
};


export type MutationcreateArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationcreateBlogArgs = {
  createBlogInput: CreateBlogInput;
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


export type MutationsignupArgs = {
  signupInput: SignUpInput;
};


export type MutationupdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationupdateBlogArgs = {
  updateBlogInput: UpdateBlogInput;
};

export type Query = {
  __typename: 'Query';
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
  id: Scalars['Float'];
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdateBlogInput = {
  body: Array<InputBlock>;
  category?: InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
  description: Scalars['String'];
  draftId: Scalars['Float'];
  id: Scalars['ID'];
  readingTime: Scalars['Float'];
  tags?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type User = {
  __typename: 'User';
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

export type ArticleQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ArticleQuery = { __typename: 'Query', getArticle: { __typename: 'Article', id: string, title: string, description: string, cover: string, readingTime: number, createdAt: any, body: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }>, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type BlogQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type BlogQuery = { __typename: 'Query', getOneBlog: { __typename: 'Blog', id: string, title: string, description: string, cover: string, readingTime: number, createdAt: any, body: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }>, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type NextArticlesQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type NextArticlesQuery = { __typename: 'Query', getNextArticles: Array<{ __typename: 'Article', id: string, title: string, cover: string, category: string }> };

export type NextBlogsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type NextBlogsQuery = { __typename: 'Query', getNextBlogs: Array<{ __typename: 'Blog', id: string, title: string, cover: string, category: string }> };

export type LoginMurationVariables = Exact<{
  loginInput: EmailLoginInput;
}>;


export type LoginMuration = { __typename: 'Mutation', login: { __typename: 'Auth', accessToken: string, refreshToken: string, user: { __typename: 'User', id: string, username: string, image?: string | null, role: string } } };

export type BlogListQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogListQuery = { __typename: 'Query', getAllBlog: Array<{ __typename: 'Blog', id: string, title: string, description: string, cover: string, createdAt: any }> };

export type CreateBlogMutationVariables = Exact<{
  createBlogInput: CreateBlogInput;
}>;


export type CreateBlogMutation = { __typename: 'Mutation', createBlog: { __typename: 'Blog', id: string } };

export type UpdateBlogMutationVariables = Exact<{
  updateBlogInput: UpdateBlogInput;
}>;


export type UpdateBlogMutation = { __typename: 'Mutation', updateBlog: { __typename: 'Blog', id: string } };

export type DraftQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DraftQuery = { __typename: 'Query', getDraft: { __typename: 'Draft', id: string, title?: string | null, description?: string | null, cover?: string | null, createdAt: any, body?: Array<{ __typename: 'Block', id: string, type: string, data: { __typename: 'BlockData', text?: string | null, level?: number | null, caption?: string | null, stretched?: boolean | null, withBackground?: boolean | null, withBorder?: boolean | null, items?: Array<string> | null, file?: { __typename: 'FileData', ref?: string | null, url?: string | null } | null } }> | null, user: { __typename: 'User', id: string, username: string, image?: string | null } } };

export type UserQueryVariables = Exact<{
  id: Scalars['Float'];
  articles: Scalars['String'];
}>;


export type UserQuery = { __typename: 'Query', getUser: { __typename: 'User', id: string, username: string, image?: string | null, createdAt: any, followers?: Array<{ __typename: 'Follower', id: string }> | null }, getUserContent?: Array<{ __typename: 'Article', id: string, title: string, cover: string, user: { __typename: 'User', id: string, username: string } }> | null };


export const ArticleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"stretched"}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}},{"kind":"Field","name":{"kind":"Name","value":"withBorder"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"readingTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;

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
export const BlogQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlogQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOneBlog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ref"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"stretched"}},{"kind":"Field","name":{"kind":"Name","value":"withBackground"}},{"kind":"Field","name":{"kind":"Name","value":"withBorder"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"readingTime"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode;

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
export const LoginMurationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMuration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode;
export type LoginMurationMutationFn = Apollo.MutationFunction<LoginMuration, LoginMurationVariables>;

/**
 * __useLoginMuration__
 *
 * To run a mutation, you first call `useLoginMuration` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMuration` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMuration, { data, loading, error }] = useLoginMuration({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMuration(baseOptions?: Apollo.MutationHookOptions<LoginMuration, LoginMurationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMuration, LoginMurationVariables>(LoginMurationDocument, options);
      }
export type LoginMurationHookResult = ReturnType<typeof useLoginMuration>;
export type LoginMurationMutationResult = Apollo.MutationResult<LoginMuration>;
export type LoginMurationMutationOptions = Apollo.BaseMutationOptions<LoginMuration, LoginMurationVariables>;
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
export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articles"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getUserContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"articles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articles"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode;

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