import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = Node & {
  __typename?: 'Category';
  /** The ID of an object */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The products that belong to the category. */
  products: ProductConnection;
};


export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategoryEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Category>;
};

export enum MessageStatus {
  Failure = 'failure',
  Success = 'success'
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Personal details sent with a quote request. */
export type PersonalDetailsForQuoteInput = {
  /** The sender's home city. */
  city?: InputMaybe<Scalars['String']>;
  /** The name of the sender's company. */
  companyName?: InputMaybe<Scalars['String']>;
  /** The sender's email address. */
  emailAddress: Scalars['String'];
  /** The message body to be sent. */
  message?: InputMaybe<Scalars['String']>;
  /** The sender's name. */
  name: Scalars['String'];
  /** The ID number of the sender, typically their RUT. */
  personalIdNumber: Scalars['String'];
  /** The senders' phone number. */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Product = Node & {
  __typename?: 'Product';
  /** Path to an attachment file (usually a PDF) for the product. */
  attachmentPath: Scalars['String'];
  /** Detailed description of the product. */
  description: Scalars['String'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** Path to an image file for the product. */
  imagePath: Scalars['String'];
  name: Scalars['String'];
  /** Price at which the store buys the product. */
  purchasePrice: Scalars['Int'];
  /** Price at which the store sells the product. */
  salePrice: Scalars['Int'];
  /** Name or RUT of the supplier of the product. */
  supplierName: Scalars['String'];
};

/** A connection to a list of items. */
export type ProductConnection = {
  __typename?: 'ProductConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductEdge = {
  __typename?: 'ProductEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Product>;
};

/** A list of product IDs and quantities that the user wants quoted. */
export type ProductsToQuoteInput = {
  /** ID of the product to be quoted. */
  productId?: InputMaybe<Scalars['ID']>;
  /** Quantity of the product to be quoted. */
  quantity?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  fetchCategories: CategoryConnection;
  fetchCategory: Category;
  fetchProduct: Product;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  searchProducts: ProductConnection;
  sendContactMessage: SendMessageResponse;
  sendQuoteRequest: SendMessageResponse;
};


export type QueryFetchCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFetchCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type QueryFetchProductArgs = {
  productId: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QuerySearchProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  searchTerm: Scalars['String'];
};


export type QuerySendContactMessageArgs = {
  emailAddress: Scalars['String'];
  message: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  personalIdNumber: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type QuerySendQuoteRequestArgs = {
  input: QuoteRequestInput;
};

/** Input object for sending quote requests. */
export type QuoteRequestInput = {
  personalDetails: PersonalDetailsForQuoteInput;
  productsToQuote: Array<ProductsToQuoteInput>;
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  message: Scalars['String'];
  status?: Maybe<MessageStatus>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryConnection: ResolverTypeWrapper<CategoryConnection>;
  CategoryEdge: ResolverTypeWrapper<CategoryEdge>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MessageStatus: MessageStatus;
  Node: ResolversTypes['Category'] | ResolversTypes['Product'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PersonalDetailsForQuoteInput: PersonalDetailsForQuoteInput;
  Product: ResolverTypeWrapper<Product>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  ProductsToQuoteInput: ProductsToQuoteInput;
  Query: ResolverTypeWrapper<{}>;
  QuoteRequestInput: QuoteRequestInput;
  SendMessageResponse: ResolverTypeWrapper<SendMessageResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Category: Category;
  CategoryConnection: CategoryConnection;
  CategoryEdge: CategoryEdge;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Node: ResolversParentTypes['Category'] | ResolversParentTypes['Product'];
  PageInfo: PageInfo;
  PersonalDetailsForQuoteInput: PersonalDetailsForQuoteInput;
  Product: Product;
  ProductConnection: ProductConnection;
  ProductEdge: ProductEdge;
  ProductsToQuoteInput: ProductsToQuoteInput;
  Query: {};
  QuoteRequestInput: QuoteRequestInput;
  SendMessageResponse: SendMessageResponse;
  String: Scalars['String'];
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, Partial<CategoryProductsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryConnection'] = ResolversParentTypes['CategoryConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryEdge'] = ResolversParentTypes['CategoryEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageStatusResolvers = { FAILURE: 'failure', SUCCESS: 'success' };

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Category' | 'Product', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  attachmentPath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imagePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  purchasePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salePrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  supplierName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  fetchCategories?: Resolver<ResolversTypes['CategoryConnection'], ParentType, ContextType, Partial<QueryFetchCategoriesArgs>>;
  fetchCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryFetchCategoryArgs, 'categoryId'>>;
  fetchProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryFetchProductArgs, 'productId'>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  searchProducts?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<QuerySearchProductsArgs, 'searchTerm'>>;
  sendContactMessage?: Resolver<ResolversTypes['SendMessageResponse'], ParentType, ContextType, RequireFields<QuerySendContactMessageArgs, 'emailAddress' | 'message' | 'personalIdNumber'>>;
  sendQuoteRequest?: Resolver<ResolversTypes['SendMessageResponse'], ParentType, ContextType, RequireFields<QuerySendQuoteRequestArgs, 'input'>>;
}>;

export type SendMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendMessageResponse'] = ResolversParentTypes['SendMessageResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MessageStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  CategoryConnection?: CategoryConnectionResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  MessageStatus?: MessageStatusResolvers;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SendMessageResponse?: SendMessageResponseResolvers<ContextType>;
}>;

