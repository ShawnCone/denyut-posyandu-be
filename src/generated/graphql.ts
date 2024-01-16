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
  label: Scalars['String']['output']
  previousMeasurementData?: Maybe<PreviousGrowthMeasurementData>
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

export type PreviousGrowthMeasurementData = {
  __typename?: 'PreviousGrowthMeasurementData'
  measurementDate: Scalars['String']['output']
  measurementValue: Scalars['Float']['output']
}

export type Query = {
  __typename?: 'Query'
  growthGraphStandardData?: Maybe<GrowthGraphStandardDataResponse>
  growthInterpretation?: Maybe<GrowthInterpretationResponse>
  singleMeasurementMonthSKDNData: SingleMeasurementMonthSkdnDataResponse
  validSKDNMonthYear: Array<SingleMeasurementMonthYear>
  weightGrowthEvaluation?: Maybe<WeightGrowthEvaluationResponse>
}

export type Query_GrowthGraphStandardDataArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type Query_GrowthInterpretationArgs = {
  growthType: GrowthType
  recordId: Scalars['String']['input']
}

export type Query_SingleMeasurementMonthSkdnDataArgs = {
  posyanduId: Scalars['String']['input']
  recordMonthIdx: Scalars['Int']['input']
  recordYear: Scalars['Int']['input']
}

export type Query_ValidSkdnMonthYearArgs = {
  posyanduId: Scalars['String']['input']
}

export type Query_WeightGrowthEvaluationArgs = {
  recordId: Scalars['String']['input']
}

export type SingleMeasurementMonthSkdnDataResponse = {
  __typename?: 'SingleMeasurementMonthSKDNDataResponse'
  LCount: Scalars['Int']['output']
  S36Count: Scalars['Int']['output']
  dCount: Scalars['Int']['output']
  goodWeightCount: Scalars['Int']['output']
  kCount: Scalars['Int']['output']
  lessWeightCount: Scalars['Int']['output']
  lowWeightCount: Scalars['Int']['output']
  nCount: Scalars['Int']['output']
  sCount: Scalars['Int']['output']
}

export type SingleMeasurementMonthYear = {
  __typename?: 'SingleMeasurementMonthYear'
  monthIdx: Scalars['Int']['output']
  year: Scalars['Int']['output']
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

export type WeightGrowthEvaluationResponse = {
  __typename?: 'WeightGrowthEvaluationResponse'
  increaseInWeight: Scalars['Float']['output']
  isEnough: Scalars['Boolean']['output']
  targetIncrease: Scalars['Float']['output']
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
  PreviousGrowthMeasurementData: ResolverTypeWrapper<PreviousGrowthMeasurementData>
  Query: ResolverTypeWrapper<{}>
  SingleMeasurementMonthSKDNDataResponse: ResolverTypeWrapper<SingleMeasurementMonthSkdnDataResponse>
  SingleMeasurementMonthYear: ResolverTypeWrapper<SingleMeasurementMonthYear>
  SingleMonthGrowthData: ResolverTypeWrapper<SingleMonthGrowthData>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  WeightGrowthEvaluationResponse: ResolverTypeWrapper<WeightGrowthEvaluationResponse>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output']
  Float: Scalars['Float']['output']
  GrowthGraphStandardDataResponse: GrowthGraphStandardDataResponse
  GrowthInterpretationResponse: GrowthInterpretationResponse
  Int: Scalars['Int']['output']
  PreviousGrowthMeasurementData: PreviousGrowthMeasurementData
  Query: {}
  SingleMeasurementMonthSKDNDataResponse: SingleMeasurementMonthSkdnDataResponse
  SingleMeasurementMonthYear: SingleMeasurementMonthYear
  SingleMonthGrowthData: SingleMonthGrowthData
  String: Scalars['String']['output']
  WeightGrowthEvaluationResponse: WeightGrowthEvaluationResponse
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
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  previousMeasurementData?: Resolver<
    Maybe<ResolversTypes['PreviousGrowthMeasurementData']>,
    ParentType,
    ContextType
  >
  severity?: Resolver<
    ResolversTypes['GrowthInterpretationSeverity'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type PreviousGrowthMeasurementDataResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['PreviousGrowthMeasurementData'] = ResolversParentTypes['PreviousGrowthMeasurementData'],
> = ResolversObject<{
  measurementDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  measurementValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
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
  singleMeasurementMonthSKDNData: Resolver<
    ResolversTypes['SingleMeasurementMonthSKDNDataResponse'],
    ParentType,
    ContextType,
    RequireFields<
      Query_SingleMeasurementMonthSkdnDataArgs,
      'posyanduId' | 'recordMonthIdx' | 'recordYear'
    >
  >
  validSKDNMonthYear: Resolver<
    Array<ResolversTypes['SingleMeasurementMonthYear']>,
    ParentType,
    ContextType,
    RequireFields<Query_ValidSkdnMonthYearArgs, 'posyanduId'>
  >
  weightGrowthEvaluation: Resolver<
    Maybe<ResolversTypes['WeightGrowthEvaluationResponse']>,
    ParentType,
    ContextType,
    RequireFields<Query_WeightGrowthEvaluationArgs, 'recordId'>
  >
}>

export type SingleMeasurementMonthSkdnDataResponseResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['SingleMeasurementMonthSKDNDataResponse'] = ResolversParentTypes['SingleMeasurementMonthSKDNDataResponse'],
> = ResolversObject<{
  LCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  S36Count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  dCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  goodWeightCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  kCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lessWeightCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lowWeightCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  nCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  sCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SingleMeasurementMonthYearResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['SingleMeasurementMonthYear'] = ResolversParentTypes['SingleMeasurementMonthYear'],
> = ResolversObject<{
  monthIdx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
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

export type WeightGrowthEvaluationResponseResolvers<
  ContextType = AuthContext,
  ParentType extends
    ResolversParentTypes['WeightGrowthEvaluationResponse'] = ResolversParentTypes['WeightGrowthEvaluationResponse'],
> = ResolversObject<{
  increaseInWeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  isEnough?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  targetIncrease?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = AuthContext> = ResolversObject<{
  GrowthGraphStandardDataResponse?: GrowthGraphStandardDataResponseResolvers<ContextType>
  GrowthInterpretationResponse?: GrowthInterpretationResponseResolvers<ContextType>
  PreviousGrowthMeasurementData?: PreviousGrowthMeasurementDataResolvers<ContextType>
  Query: QueryResolvers<ContextType>
  SingleMeasurementMonthSKDNDataResponse?: SingleMeasurementMonthSkdnDataResponseResolvers<ContextType>
  SingleMeasurementMonthYear?: SingleMeasurementMonthYearResolvers<ContextType>
  SingleMonthGrowthData?: SingleMonthGrowthDataResolvers<ContextType>
  WeightGrowthEvaluationResponse?: WeightGrowthEvaluationResponseResolvers<ContextType>
}>
