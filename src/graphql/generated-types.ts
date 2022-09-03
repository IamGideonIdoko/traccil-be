import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, BookModel } from './models';
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
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  joinedDate: Scalars['DateTime'];
  location?: Maybe<ClientLocation>;
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  phoneVerified?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  work: Array<Work>;
};

export type ClientLocation = {
  __typename?: 'ClientLocation';
  client: Client;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  addUser?: Maybe<User>;
  createWorker?: Maybe<Worker>;
};


export type MutationAddBookArgs = {
  genre?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationAddUserArgs = {
  age?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateWorkerArgs = {
  worker: WorkerCreateInput;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryBookArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  services: Array<ServiceSection>;
  title: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  sections: Array<ServiceSection>;
  title: Scalars['String'];
  work: Array<Work>;
  workmen: Array<WorkerService>;
};

export type ServiceSection = {
  __typename?: 'ServiceSection';
  section: Section;
  service: Service;
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  books?: Maybe<Array<Book>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Work = {
  __typename?: 'Work';
  client: Client;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  location?: Maybe<WorkLocation>;
  paymentId?: Maybe<Scalars['String']>;
  requestTime: Scalars['DateTime'];
  service: Service;
  workEndTime?: Maybe<Scalars['DateTime']>;
  workStartTime?: Maybe<Scalars['DateTime']>;
  worker: Worker;
};

export type WorkLocation = {
  __typename?: 'WorkLocation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  work: Work;
};

export type Worker = {
  __typename?: 'Worker';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID'];
  joinedDate: Scalars['DateTime'];
  location?: Maybe<WorkerLocation>;
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  phoneVerified?: Maybe<Scalars['Boolean']>;
  services: Array<WorkerService>;
  verified?: Maybe<Scalars['Boolean']>;
  work: Array<Work>;
};

export type WorkerCreateInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<Gender>;
  joinedDate: Scalars['DateTime'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  phoneVerified?: InputMaybe<Scalars['Boolean']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type WorkerLocation = {
  __typename?: 'WorkerLocation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  worker: Worker;
};

export type WorkerService = {
  __typename?: 'WorkerService';
  service: Service;
  worker: Worker;
};



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
export type ResolversTypes = {
  Book: ResolverTypeWrapper<BookModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Client: ResolverTypeWrapper<Client>;
  ClientLocation: ResolverTypeWrapper<ClientLocation>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gender: Gender;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Section: ResolverTypeWrapper<Section>;
  Service: ResolverTypeWrapper<Service>;
  ServiceSection: ResolverTypeWrapper<ServiceSection>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserModel>;
  Work: ResolverTypeWrapper<Work>;
  WorkLocation: ResolverTypeWrapper<WorkLocation>;
  Worker: ResolverTypeWrapper<Worker>;
  WorkerCreateInput: WorkerCreateInput;
  WorkerLocation: ResolverTypeWrapper<WorkerLocation>;
  WorkerService: ResolverTypeWrapper<WorkerService>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Book: BookModel;
  Boolean: Scalars['Boolean'];
  Client: Client;
  ClientLocation: ClientLocation;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Section: Section;
  Service: Service;
  ServiceSection: ServiceSection;
  String: Scalars['String'];
  User: UserModel;
  Work: Work;
  WorkLocation: WorkLocation;
  Worker: Worker;
  WorkerCreateInput: WorkerCreateInput;
  WorkerLocation: WorkerLocation;
  WorkerService: WorkerService;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['ClientLocation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  work?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientLocation'] = ResolversParentTypes['ClientLocation']> = {
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, Partial<MutationAddBookArgs>>;
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationAddUserArgs>>;
  createWorker?: Resolver<Maybe<ResolversTypes['Worker']>, ParentType, ContextType, RequireFields<MutationCreateWorkerArgs, 'worker'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryBookArgs, 'id'>>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  services?: Resolver<Array<ResolversTypes['ServiceSection']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['ServiceSection']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  work?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType>;
  workmen?: Resolver<Array<ResolversTypes['WorkerService']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServiceSection'] = ResolversParentTypes['ServiceSection']> = {
  section?: Resolver<ResolversTypes['Section'], ParentType, ContextType>;
  service?: Resolver<ResolversTypes['Service'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  books?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Work'] = ResolversParentTypes['Work']> = {
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['WorkLocation']>, ParentType, ContextType>;
  paymentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  service?: Resolver<ResolversTypes['Service'], ParentType, ContextType>;
  workEndTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  workStartTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  worker?: Resolver<ResolversTypes['Worker'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkLocation'] = ResolversParentTypes['WorkLocation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  work?: Resolver<ResolversTypes['Work'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Worker'] = ResolversParentTypes['Worker']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['WorkerLocation']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  services?: Resolver<Array<ResolversTypes['WorkerService']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  work?: Resolver<Array<ResolversTypes['Work']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerLocation'] = ResolversParentTypes['WorkerLocation']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  worker?: Resolver<ResolversTypes['Worker'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkerServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkerService'] = ResolversParentTypes['WorkerService']> = {
  service?: Resolver<ResolversTypes['Service'], ParentType, ContextType>;
  worker?: Resolver<ResolversTypes['Worker'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Book?: BookResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  ClientLocation?: ClientLocationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Service?: ServiceResolvers<ContextType>;
  ServiceSection?: ServiceSectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Work?: WorkResolvers<ContextType>;
  WorkLocation?: WorkLocationResolvers<ContextType>;
  Worker?: WorkerResolvers<ContextType>;
  WorkerLocation?: WorkerLocationResolvers<ContextType>;
  WorkerService?: WorkerServiceResolvers<ContextType>;
};

