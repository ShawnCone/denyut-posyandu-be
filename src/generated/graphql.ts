import { GraphQLResolveInfo } from 'graphql'
import { AuthContext } from '../context/AuthContext'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type GrowthGraphStandardDataResponse = {
  __typename?: 'GrowthGraphStandardDataResponse'
  measurementMonthOld: Scalars['Int']['output']
  measurementValue: Scalars['Float']['output']
  standardData: Array<SingleMonthGrowthData>
}

export type GrowthInterpretationResponse = {
  __typename?: 'GrowthInterpretationResponse'
  differenceSincePrevious?: Maybe<Scalars['Float']['output']>
  isEnough?: Maybe<Scalars['Boolean']['output']>
  label: Scalars['String']['output']
  severity: GrowthInterpretationSeverity
}

export enum GrowthInterpretationSeverity {
  Normal = 'NORMAL',
  Severe = 'SEVERE',
  Warning = 'WARNING',
}

export enum GrowthType {
  Armcirc = 'ARMCIRC',
  Headcirc = 'HEADCIRC',
  Height = 'HEIGHT',
  Weight = 'WEIGHT',
}

export type Query = {
  __typename?: 'Query'
  growthGraphStandardData?: Maybe<GrowthGraphStandardDataResponse>
  growthInterpretation?: Maybe<GrowthInterpretationResponse>
}

export type Query_GrowthGraphStandardDataArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type Query_GrowthInterpretationArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type SingleMonthGrowthData = {
  __typename?: 'SingleMonthGrowthData'
  SD0: Scalars['Float']['output']
  SD1: Scalars['Float']['output']
  SD1neg: Scalars['Float']['output']
  SD2: Scalars['Float']['output']
  SD2neg: Scalars['Float']['output']
  SD3: Scalars['Float']['output']
  SD3neg: Scalars['Float']['output']
  ageInMonths: Scalars['Int']['output']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  GrowthGraphStandardDataResponse: ResolverTypeWrapper<GrowthGraphStandardDataResponse>
  GrowthInterpretationResponse: ResolverTypeWrapper<GrowthInterpretationResponse>
  GrowthInterpretationSeverity: GrowthInterpretationSeverity
  GrowthType: GrowthType
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  Query: ResolverTypeWrapper<{}>
  SingleMonthGrowthData: ResolverTypeWrapper<SingleMonthGrowthData>
  String: ResolverTypeWrapper<Scalars['String']['output']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output']
  Float: Scalars['Float']['output']
  GrowthGraphStandardDataResponse: GrowthGraphStandardDataResponse
  GrowthInterpretationResponse: GrowthInterpretationResponse
  Int: Scalars['Int']['output']
  Query: {}
  SingleMonthGrowthData: SingleMonthGrowthData
  String: Scalars['String']['output']
}>

export type GrowthGraphStandardDataResponseResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['GrowthGraphStandardDataResponse'] = ResolversParentTypes['GrowthGraphStandardDataResponse'],
> = ResolversObject<{
  measurementMonthOld?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  measurementValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  standardData?: Resolver<
    Array<ResolversTypes['SingleMonthGrowthData']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type GrowthInterpretationResponseResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['GrowthInterpretationResponse'] = ResolversParentTypes['GrowthInterpretationResponse'],
> = ResolversObject<{
  differenceSincePrevious?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  isEnough?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  severity?: Resolver<
    ResolversTypes['GrowthInterpretationSeverity'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  growthGraphStandardData: Resolver<
    Maybe<ResolversTypes['GrowthGraphStandardDataResponse']>,
    ParentType,
    ContextType,
    RequireFields<Query_GrowthGraphStandardDataArgs, 'growthType' | 'recordId'>
  >
  growthInterpretation: Resolver<
    Maybe<ResolversTypes['GrowthInterpretationResponse']>,
    ParentType,
    ContextType,
    RequireFields<Query_GrowthInterpretationArgs, 'growthType' | 'recordId'>
  >
}>

export type SingleMonthGrowthDataResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['SingleMonthGrowthData'] = ResolversParentTypes['SingleMonthGrowthData'],
> = ResolversObject<{
  SD0?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD1?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD1neg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD2?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD2neg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD3?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  SD3neg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  ageInMonths?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = AuthContext> = ResolversObject<{
  GrowthGraphStandardDataResponse?: GrowthGraphStandardDataResponseResolvers<ContextType>
  GrowthInterpretationResponse?: GrowthInterpretationResponseResolvers<ContextType>
  Query: QueryResolvers<ContextType>
  SingleMonthGrowthData?: SingleMonthGrowthDataResolvers<ContextType>
}>
