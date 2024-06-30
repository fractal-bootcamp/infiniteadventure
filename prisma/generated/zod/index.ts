import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PixelDexScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','type','description','frontImg','backImg','hp','attack','defense','speed']);

export const MoveScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','type','power','accuracy','pixelDexId']);

export const PixelmanScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','pixelDexId']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','secret','createdAt','updatedAt']);

export const BattleScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','battle']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PIXEL DEX SCHEMA
/////////////////////////////////////////

export const PixelDexSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().nullable(),
  backImg: z.string().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
})

export type PixelDex = z.infer<typeof PixelDexSchema>

/////////////////////////////////////////
// MOVE SCHEMA
/////////////////////////////////////////

export const MoveSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int(),
  pixelDexId: z.string(),
})

export type Move = z.infer<typeof MoveSchema>

/////////////////////////////////////////
// PIXELMAN SCHEMA
/////////////////////////////////////////

export const PixelmanSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  pixelDexId: z.string(),
})

export type Pixelman = z.infer<typeof PixelmanSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  secret: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// BATTLE SCHEMA
/////////////////////////////////////////

export const BattleSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  battle: JsonValueSchema,
})

export type Battle = z.infer<typeof BattleSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PIXEL DEX
//------------------------------------------------------

export const PixelDexIncludeSchema: z.ZodType<Prisma.PixelDexInclude> = z.object({
  moves: z.union([z.boolean(),z.lazy(() => MoveFindManyArgsSchema)]).optional(),
  pixelman: z.union([z.boolean(),z.lazy(() => PixelmanFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PixelDexCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PixelDexArgsSchema: z.ZodType<Prisma.PixelDexDefaultArgs> = z.object({
  select: z.lazy(() => PixelDexSelectSchema).optional(),
  include: z.lazy(() => PixelDexIncludeSchema).optional(),
}).strict();

export const PixelDexCountOutputTypeArgsSchema: z.ZodType<Prisma.PixelDexCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PixelDexCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PixelDexCountOutputTypeSelectSchema: z.ZodType<Prisma.PixelDexCountOutputTypeSelect> = z.object({
  moves: z.boolean().optional(),
  pixelman: z.boolean().optional(),
}).strict();

export const PixelDexSelectSchema: z.ZodType<Prisma.PixelDexSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  type: z.boolean().optional(),
  description: z.boolean().optional(),
  frontImg: z.boolean().optional(),
  backImg: z.boolean().optional(),
  hp: z.boolean().optional(),
  attack: z.boolean().optional(),
  defense: z.boolean().optional(),
  speed: z.boolean().optional(),
  moves: z.union([z.boolean(),z.lazy(() => MoveFindManyArgsSchema)]).optional(),
  pixelman: z.union([z.boolean(),z.lazy(() => PixelmanFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PixelDexCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MOVE
//------------------------------------------------------

export const MoveIncludeSchema: z.ZodType<Prisma.MoveInclude> = z.object({
  pixelDex: z.union([z.boolean(),z.lazy(() => PixelDexArgsSchema)]).optional(),
}).strict()

export const MoveArgsSchema: z.ZodType<Prisma.MoveDefaultArgs> = z.object({
  select: z.lazy(() => MoveSelectSchema).optional(),
  include: z.lazy(() => MoveIncludeSchema).optional(),
}).strict();

export const MoveSelectSchema: z.ZodType<Prisma.MoveSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  type: z.boolean().optional(),
  power: z.boolean().optional(),
  accuracy: z.boolean().optional(),
  pixelDexId: z.boolean().optional(),
  pixelDex: z.union([z.boolean(),z.lazy(() => PixelDexArgsSchema)]).optional(),
}).strict()

// PIXELMAN
//------------------------------------------------------

export const PixelmanIncludeSchema: z.ZodType<Prisma.PixelmanInclude> = z.object({
  pixelDex: z.union([z.boolean(),z.lazy(() => PixelDexArgsSchema)]).optional(),
}).strict()

export const PixelmanArgsSchema: z.ZodType<Prisma.PixelmanDefaultArgs> = z.object({
  select: z.lazy(() => PixelmanSelectSchema).optional(),
  include: z.lazy(() => PixelmanIncludeSchema).optional(),
}).strict();

export const PixelmanSelectSchema: z.ZodType<Prisma.PixelmanSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  pixelDexId: z.boolean().optional(),
  pixelDex: z.union([z.boolean(),z.lazy(() => PixelDexArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  secret: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// BATTLE
//------------------------------------------------------

export const BattleSelectSchema: z.ZodType<Prisma.BattleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  battle: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PixelDexWhereInputSchema: z.ZodType<Prisma.PixelDexWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PixelDexWhereInputSchema),z.lazy(() => PixelDexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelDexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelDexWhereInputSchema),z.lazy(() => PixelDexWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  frontImg: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  backImg: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hp: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  moves: z.lazy(() => MoveListRelationFilterSchema).optional(),
  pixelman: z.lazy(() => PixelmanListRelationFilterSchema).optional()
}).strict();

export const PixelDexOrderByWithRelationInputSchema: z.ZodType<Prisma.PixelDexOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frontImg: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  backImg: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  moves: z.lazy(() => MoveOrderByRelationAggregateInputSchema).optional(),
  pixelman: z.lazy(() => PixelmanOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PixelDexWhereUniqueInputSchema: z.ZodType<Prisma.PixelDexWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PixelDexWhereInputSchema),z.lazy(() => PixelDexWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelDexWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelDexWhereInputSchema),z.lazy(() => PixelDexWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  frontImg: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  backImg: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hp: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  attack: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  defense: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  speed: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  moves: z.lazy(() => MoveListRelationFilterSchema).optional(),
  pixelman: z.lazy(() => PixelmanListRelationFilterSchema).optional()
}).strict());

export const PixelDexOrderByWithAggregationInputSchema: z.ZodType<Prisma.PixelDexOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frontImg: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  backImg: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PixelDexCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PixelDexAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PixelDexMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PixelDexMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PixelDexSumOrderByAggregateInputSchema).optional()
}).strict();

export const PixelDexScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PixelDexScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PixelDexScalarWhereWithAggregatesInputSchema),z.lazy(() => PixelDexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelDexScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelDexScalarWhereWithAggregatesInputSchema),z.lazy(() => PixelDexScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  frontImg: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  backImg: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hp: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  attack: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  defense: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  speed: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const MoveWhereInputSchema: z.ZodType<Prisma.MoveWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MoveWhereInputSchema),z.lazy(() => MoveWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MoveWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MoveWhereInputSchema),z.lazy(() => MoveWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  power: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accuracy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pixelDex: z.union([ z.lazy(() => PixelDexRelationFilterSchema),z.lazy(() => PixelDexWhereInputSchema) ]).optional(),
}).strict();

export const MoveOrderByWithRelationInputSchema: z.ZodType<Prisma.MoveOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional(),
  pixelDex: z.lazy(() => PixelDexOrderByWithRelationInputSchema).optional()
}).strict();

export const MoveWhereUniqueInputSchema: z.ZodType<Prisma.MoveWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => MoveWhereInputSchema),z.lazy(() => MoveWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MoveWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MoveWhereInputSchema),z.lazy(() => MoveWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  power: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  accuracy: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pixelDex: z.union([ z.lazy(() => PixelDexRelationFilterSchema),z.lazy(() => PixelDexWhereInputSchema) ]).optional(),
}).strict());

export const MoveOrderByWithAggregationInputSchema: z.ZodType<Prisma.MoveOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MoveCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MoveAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MoveMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MoveMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MoveSumOrderByAggregateInputSchema).optional()
}).strict();

export const MoveScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MoveScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MoveScalarWhereWithAggregatesInputSchema),z.lazy(() => MoveScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MoveScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MoveScalarWhereWithAggregatesInputSchema),z.lazy(() => MoveScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  power: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  accuracy: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PixelmanWhereInputSchema: z.ZodType<Prisma.PixelmanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PixelmanWhereInputSchema),z.lazy(() => PixelmanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelmanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelmanWhereInputSchema),z.lazy(() => PixelmanWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pixelDex: z.union([ z.lazy(() => PixelDexRelationFilterSchema),z.lazy(() => PixelDexWhereInputSchema) ]).optional(),
}).strict();

export const PixelmanOrderByWithRelationInputSchema: z.ZodType<Prisma.PixelmanOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional(),
  pixelDex: z.lazy(() => PixelDexOrderByWithRelationInputSchema).optional()
}).strict();

export const PixelmanWhereUniqueInputSchema: z.ZodType<Prisma.PixelmanWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PixelmanWhereInputSchema),z.lazy(() => PixelmanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelmanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelmanWhereInputSchema),z.lazy(() => PixelmanWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pixelDex: z.union([ z.lazy(() => PixelDexRelationFilterSchema),z.lazy(() => PixelDexWhereInputSchema) ]).optional(),
}).strict());

export const PixelmanOrderByWithAggregationInputSchema: z.ZodType<Prisma.PixelmanOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PixelmanCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PixelmanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PixelmanMinOrderByAggregateInputSchema).optional()
}).strict();

export const PixelmanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PixelmanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PixelmanScalarWhereWithAggregatesInputSchema),z.lazy(() => PixelmanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelmanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelmanScalarWhereWithAggregatesInputSchema),z.lazy(() => PixelmanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BattleWhereInputSchema: z.ZodType<Prisma.BattleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BattleWhereInputSchema),z.lazy(() => BattleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BattleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BattleWhereInputSchema),z.lazy(() => BattleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  battle: z.lazy(() => JsonFilterSchema).optional()
}).strict();

export const BattleOrderByWithRelationInputSchema: z.ZodType<Prisma.BattleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  battle: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BattleWhereUniqueInputSchema: z.ZodType<Prisma.BattleWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => BattleWhereInputSchema),z.lazy(() => BattleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BattleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BattleWhereInputSchema),z.lazy(() => BattleWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  battle: z.lazy(() => JsonFilterSchema).optional()
}).strict());

export const BattleOrderByWithAggregationInputSchema: z.ZodType<Prisma.BattleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  battle: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BattleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BattleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BattleMinOrderByAggregateInputSchema).optional()
}).strict();

export const BattleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BattleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BattleScalarWhereWithAggregatesInputSchema),z.lazy(() => BattleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BattleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BattleScalarWhereWithAggregatesInputSchema),z.lazy(() => BattleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  battle: z.lazy(() => JsonWithAggregatesFilterSchema).optional()
}).strict();

export const PixelDexCreateInputSchema: z.ZodType<Prisma.PixelDexCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  moves: z.lazy(() => MoveCreateNestedManyWithoutPixelDexInputSchema).optional(),
  pixelman: z.lazy(() => PixelmanCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexUncheckedCreateInputSchema: z.ZodType<Prisma.PixelDexUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  moves: z.lazy(() => MoveUncheckedCreateNestedManyWithoutPixelDexInputSchema).optional(),
  pixelman: z.lazy(() => PixelmanUncheckedCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexUpdateInputSchema: z.ZodType<Prisma.PixelDexUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  moves: z.lazy(() => MoveUpdateManyWithoutPixelDexNestedInputSchema).optional(),
  pixelman: z.lazy(() => PixelmanUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const PixelDexUncheckedUpdateInputSchema: z.ZodType<Prisma.PixelDexUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  moves: z.lazy(() => MoveUncheckedUpdateManyWithoutPixelDexNestedInputSchema).optional(),
  pixelman: z.lazy(() => PixelmanUncheckedUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const PixelDexCreateManyInputSchema: z.ZodType<Prisma.PixelDexCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int()
}).strict();

export const PixelDexUpdateManyMutationInputSchema: z.ZodType<Prisma.PixelDexUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelDexUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PixelDexUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MoveCreateInputSchema: z.ZodType<Prisma.MoveCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int(),
  pixelDex: z.lazy(() => PixelDexCreateNestedOneWithoutMovesInputSchema)
}).strict();

export const MoveUncheckedCreateInputSchema: z.ZodType<Prisma.MoveUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int(),
  pixelDexId: z.string()
}).strict();

export const MoveUpdateInputSchema: z.ZodType<Prisma.MoveUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDex: z.lazy(() => PixelDexUpdateOneRequiredWithoutMovesNestedInputSchema).optional()
}).strict();

export const MoveUncheckedUpdateInputSchema: z.ZodType<Prisma.MoveUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDexId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MoveCreateManyInputSchema: z.ZodType<Prisma.MoveCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int(),
  pixelDexId: z.string()
}).strict();

export const MoveUpdateManyMutationInputSchema: z.ZodType<Prisma.MoveUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MoveUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MoveUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDexId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanCreateInputSchema: z.ZodType<Prisma.PixelmanCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pixelDex: z.lazy(() => PixelDexCreateNestedOneWithoutPixelmanInputSchema)
}).strict();

export const PixelmanUncheckedCreateInputSchema: z.ZodType<Prisma.PixelmanUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pixelDexId: z.string()
}).strict();

export const PixelmanUpdateInputSchema: z.ZodType<Prisma.PixelmanUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDex: z.lazy(() => PixelDexUpdateOneRequiredWithoutPixelmanNestedInputSchema).optional()
}).strict();

export const PixelmanUncheckedUpdateInputSchema: z.ZodType<Prisma.PixelmanUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDexId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanCreateManyInputSchema: z.ZodType<Prisma.PixelmanCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pixelDexId: z.string()
}).strict();

export const PixelmanUpdateManyMutationInputSchema: z.ZodType<Prisma.PixelmanUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PixelmanUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pixelDexId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  secret: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  secret: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  secret: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BattleCreateInputSchema: z.ZodType<Prisma.BattleCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const BattleUncheckedCreateInputSchema: z.ZodType<Prisma.BattleUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const BattleUpdateInputSchema: z.ZodType<Prisma.BattleUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const BattleUncheckedUpdateInputSchema: z.ZodType<Prisma.BattleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const BattleCreateManyInputSchema: z.ZodType<Prisma.BattleCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
}).strict();

export const BattleUpdateManyMutationInputSchema: z.ZodType<Prisma.BattleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const BattleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BattleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  battle: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const MoveListRelationFilterSchema: z.ZodType<Prisma.MoveListRelationFilter> = z.object({
  every: z.lazy(() => MoveWhereInputSchema).optional(),
  some: z.lazy(() => MoveWhereInputSchema).optional(),
  none: z.lazy(() => MoveWhereInputSchema).optional()
}).strict();

export const PixelmanListRelationFilterSchema: z.ZodType<Prisma.PixelmanListRelationFilter> = z.object({
  every: z.lazy(() => PixelmanWhereInputSchema).optional(),
  some: z.lazy(() => PixelmanWhereInputSchema).optional(),
  none: z.lazy(() => PixelmanWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const MoveOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MoveOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelmanOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PixelmanOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelDexCountOrderByAggregateInputSchema: z.ZodType<Prisma.PixelDexCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frontImg: z.lazy(() => SortOrderSchema).optional(),
  backImg: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelDexAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PixelDexAvgOrderByAggregateInput> = z.object({
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelDexMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PixelDexMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frontImg: z.lazy(() => SortOrderSchema).optional(),
  backImg: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelDexMinOrderByAggregateInputSchema: z.ZodType<Prisma.PixelDexMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  frontImg: z.lazy(() => SortOrderSchema).optional(),
  backImg: z.lazy(() => SortOrderSchema).optional(),
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelDexSumOrderByAggregateInputSchema: z.ZodType<Prisma.PixelDexSumOrderByAggregateInput> = z.object({
  hp: z.lazy(() => SortOrderSchema).optional(),
  attack: z.lazy(() => SortOrderSchema).optional(),
  defense: z.lazy(() => SortOrderSchema).optional(),
  speed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const PixelDexRelationFilterSchema: z.ZodType<Prisma.PixelDexRelationFilter> = z.object({
  is: z.lazy(() => PixelDexWhereInputSchema).optional(),
  isNot: z.lazy(() => PixelDexWhereInputSchema).optional()
}).strict();

export const MoveCountOrderByAggregateInputSchema: z.ZodType<Prisma.MoveCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MoveAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MoveAvgOrderByAggregateInput> = z.object({
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MoveMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MoveMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MoveMinOrderByAggregateInputSchema: z.ZodType<Prisma.MoveMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MoveSumOrderByAggregateInputSchema: z.ZodType<Prisma.MoveSumOrderByAggregateInput> = z.object({
  power: z.lazy(() => SortOrderSchema).optional(),
  accuracy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelmanCountOrderByAggregateInputSchema: z.ZodType<Prisma.PixelmanCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelmanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PixelmanMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PixelmanMinOrderByAggregateInputSchema: z.ZodType<Prisma.PixelmanMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pixelDexId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const BattleCountOrderByAggregateInputSchema: z.ZodType<Prisma.BattleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  battle: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BattleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BattleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BattleMinOrderByAggregateInputSchema: z.ZodType<Prisma.BattleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const MoveCreateNestedManyWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveCreateNestedManyWithoutPixelDexInput> = z.object({
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveCreateWithoutPixelDexInputSchema).array(),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MoveCreateManyPixelDexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PixelmanCreateNestedManyWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanCreateNestedManyWithoutPixelDexInput> = z.object({
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema).array(),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PixelmanCreateManyPixelDexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MoveUncheckedCreateNestedManyWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUncheckedCreateNestedManyWithoutPixelDexInput> = z.object({
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveCreateWithoutPixelDexInputSchema).array(),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MoveCreateManyPixelDexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PixelmanUncheckedCreateNestedManyWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUncheckedCreateNestedManyWithoutPixelDexInput> = z.object({
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema).array(),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PixelmanCreateManyPixelDexInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MoveUpdateManyWithoutPixelDexNestedInputSchema: z.ZodType<Prisma.MoveUpdateManyWithoutPixelDexNestedInput> = z.object({
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveCreateWithoutPixelDexInputSchema).array(),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MoveUpsertWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => MoveUpsertWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MoveCreateManyPixelDexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MoveUpdateWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => MoveUpdateWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MoveUpdateManyWithWhereWithoutPixelDexInputSchema),z.lazy(() => MoveUpdateManyWithWhereWithoutPixelDexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MoveScalarWhereInputSchema),z.lazy(() => MoveScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PixelmanUpdateManyWithoutPixelDexNestedInputSchema: z.ZodType<Prisma.PixelmanUpdateManyWithoutPixelDexNestedInput> = z.object({
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema).array(),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PixelmanUpsertWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpsertWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PixelmanCreateManyPixelDexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PixelmanUpdateWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpdateWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PixelmanUpdateManyWithWhereWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpdateManyWithWhereWithoutPixelDexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PixelmanScalarWhereInputSchema),z.lazy(() => PixelmanScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MoveUncheckedUpdateManyWithoutPixelDexNestedInputSchema: z.ZodType<Prisma.MoveUncheckedUpdateManyWithoutPixelDexNestedInput> = z.object({
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveCreateWithoutPixelDexInputSchema).array(),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => MoveCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MoveUpsertWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => MoveUpsertWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MoveCreateManyPixelDexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MoveWhereUniqueInputSchema),z.lazy(() => MoveWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MoveUpdateWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => MoveUpdateWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MoveUpdateManyWithWhereWithoutPixelDexInputSchema),z.lazy(() => MoveUpdateManyWithWhereWithoutPixelDexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MoveScalarWhereInputSchema),z.lazy(() => MoveScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PixelmanUncheckedUpdateManyWithoutPixelDexNestedInputSchema: z.ZodType<Prisma.PixelmanUncheckedUpdateManyWithoutPixelDexNestedInput> = z.object({
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema).array(),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema),z.lazy(() => PixelmanCreateOrConnectWithoutPixelDexInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PixelmanUpsertWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpsertWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PixelmanCreateManyPixelDexInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PixelmanWhereUniqueInputSchema),z.lazy(() => PixelmanWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PixelmanUpdateWithWhereUniqueWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpdateWithWhereUniqueWithoutPixelDexInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PixelmanUpdateManyWithWhereWithoutPixelDexInputSchema),z.lazy(() => PixelmanUpdateManyWithWhereWithoutPixelDexInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PixelmanScalarWhereInputSchema),z.lazy(() => PixelmanScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PixelDexCreateNestedOneWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexCreateNestedOneWithoutMovesInput> = z.object({
  create: z.union([ z.lazy(() => PixelDexCreateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutMovesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PixelDexCreateOrConnectWithoutMovesInputSchema).optional(),
  connect: z.lazy(() => PixelDexWhereUniqueInputSchema).optional()
}).strict();

export const PixelDexUpdateOneRequiredWithoutMovesNestedInputSchema: z.ZodType<Prisma.PixelDexUpdateOneRequiredWithoutMovesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PixelDexCreateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutMovesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PixelDexCreateOrConnectWithoutMovesInputSchema).optional(),
  upsert: z.lazy(() => PixelDexUpsertWithoutMovesInputSchema).optional(),
  connect: z.lazy(() => PixelDexWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PixelDexUpdateToOneWithWhereWithoutMovesInputSchema),z.lazy(() => PixelDexUpdateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutMovesInputSchema) ]).optional(),
}).strict();

export const PixelDexCreateNestedOneWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexCreateNestedOneWithoutPixelmanInput> = z.object({
  create: z.union([ z.lazy(() => PixelDexCreateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutPixelmanInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PixelDexCreateOrConnectWithoutPixelmanInputSchema).optional(),
  connect: z.lazy(() => PixelDexWhereUniqueInputSchema).optional()
}).strict();

export const PixelDexUpdateOneRequiredWithoutPixelmanNestedInputSchema: z.ZodType<Prisma.PixelDexUpdateOneRequiredWithoutPixelmanNestedInput> = z.object({
  create: z.union([ z.lazy(() => PixelDexCreateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutPixelmanInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PixelDexCreateOrConnectWithoutPixelmanInputSchema).optional(),
  upsert: z.lazy(() => PixelDexUpsertWithoutPixelmanInputSchema).optional(),
  connect: z.lazy(() => PixelDexWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PixelDexUpdateToOneWithWhereWithoutPixelmanInputSchema),z.lazy(() => PixelDexUpdateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutPixelmanInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const MoveCreateWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveCreateWithoutPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int()
}).strict();

export const MoveUncheckedCreateWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUncheckedCreateWithoutPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int()
}).strict();

export const MoveCreateOrConnectWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveCreateOrConnectWithoutPixelDexInput> = z.object({
  where: z.lazy(() => MoveWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema) ]),
}).strict();

export const MoveCreateManyPixelDexInputEnvelopeSchema: z.ZodType<Prisma.MoveCreateManyPixelDexInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MoveCreateManyPixelDexInputSchema),z.lazy(() => MoveCreateManyPixelDexInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PixelmanCreateWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanCreateWithoutPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PixelmanUncheckedCreateWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUncheckedCreateWithoutPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PixelmanCreateOrConnectWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanCreateOrConnectWithoutPixelDexInput> = z.object({
  where: z.lazy(() => PixelmanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema) ]),
}).strict();

export const PixelmanCreateManyPixelDexInputEnvelopeSchema: z.ZodType<Prisma.PixelmanCreateManyPixelDexInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PixelmanCreateManyPixelDexInputSchema),z.lazy(() => PixelmanCreateManyPixelDexInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MoveUpsertWithWhereUniqueWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUpsertWithWhereUniqueWithoutPixelDexInput> = z.object({
  where: z.lazy(() => MoveWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MoveUpdateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedUpdateWithoutPixelDexInputSchema) ]),
  create: z.union([ z.lazy(() => MoveCreateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedCreateWithoutPixelDexInputSchema) ]),
}).strict();

export const MoveUpdateWithWhereUniqueWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUpdateWithWhereUniqueWithoutPixelDexInput> = z.object({
  where: z.lazy(() => MoveWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MoveUpdateWithoutPixelDexInputSchema),z.lazy(() => MoveUncheckedUpdateWithoutPixelDexInputSchema) ]),
}).strict();

export const MoveUpdateManyWithWhereWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUpdateManyWithWhereWithoutPixelDexInput> = z.object({
  where: z.lazy(() => MoveScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MoveUpdateManyMutationInputSchema),z.lazy(() => MoveUncheckedUpdateManyWithoutPixelDexInputSchema) ]),
}).strict();

export const MoveScalarWhereInputSchema: z.ZodType<Prisma.MoveScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MoveScalarWhereInputSchema),z.lazy(() => MoveScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MoveScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MoveScalarWhereInputSchema),z.lazy(() => MoveScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  power: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  accuracy: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PixelmanUpsertWithWhereUniqueWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUpsertWithWhereUniqueWithoutPixelDexInput> = z.object({
  where: z.lazy(() => PixelmanWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PixelmanUpdateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedUpdateWithoutPixelDexInputSchema) ]),
  create: z.union([ z.lazy(() => PixelmanCreateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedCreateWithoutPixelDexInputSchema) ]),
}).strict();

export const PixelmanUpdateWithWhereUniqueWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUpdateWithWhereUniqueWithoutPixelDexInput> = z.object({
  where: z.lazy(() => PixelmanWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PixelmanUpdateWithoutPixelDexInputSchema),z.lazy(() => PixelmanUncheckedUpdateWithoutPixelDexInputSchema) ]),
}).strict();

export const PixelmanUpdateManyWithWhereWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUpdateManyWithWhereWithoutPixelDexInput> = z.object({
  where: z.lazy(() => PixelmanScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PixelmanUpdateManyMutationInputSchema),z.lazy(() => PixelmanUncheckedUpdateManyWithoutPixelDexInputSchema) ]),
}).strict();

export const PixelmanScalarWhereInputSchema: z.ZodType<Prisma.PixelmanScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PixelmanScalarWhereInputSchema),z.lazy(() => PixelmanScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PixelmanScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PixelmanScalarWhereInputSchema),z.lazy(() => PixelmanScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pixelDexId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PixelDexCreateWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexCreateWithoutMovesInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  pixelman: z.lazy(() => PixelmanCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexUncheckedCreateWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexUncheckedCreateWithoutMovesInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  pixelman: z.lazy(() => PixelmanUncheckedCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexCreateOrConnectWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexCreateOrConnectWithoutMovesInput> = z.object({
  where: z.lazy(() => PixelDexWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PixelDexCreateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutMovesInputSchema) ]),
}).strict();

export const PixelDexUpsertWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexUpsertWithoutMovesInput> = z.object({
  update: z.union([ z.lazy(() => PixelDexUpdateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutMovesInputSchema) ]),
  create: z.union([ z.lazy(() => PixelDexCreateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutMovesInputSchema) ]),
  where: z.lazy(() => PixelDexWhereInputSchema).optional()
}).strict();

export const PixelDexUpdateToOneWithWhereWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexUpdateToOneWithWhereWithoutMovesInput> = z.object({
  where: z.lazy(() => PixelDexWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PixelDexUpdateWithoutMovesInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutMovesInputSchema) ]),
}).strict();

export const PixelDexUpdateWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexUpdateWithoutMovesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pixelman: z.lazy(() => PixelmanUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const PixelDexUncheckedUpdateWithoutMovesInputSchema: z.ZodType<Prisma.PixelDexUncheckedUpdateWithoutMovesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pixelman: z.lazy(() => PixelmanUncheckedUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const PixelDexCreateWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexCreateWithoutPixelmanInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  moves: z.lazy(() => MoveCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexUncheckedCreateWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexUncheckedCreateWithoutPixelmanInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  frontImg: z.string().optional().nullable(),
  backImg: z.string().optional().nullable(),
  hp: z.number().int(),
  attack: z.number().int(),
  defense: z.number().int(),
  speed: z.number().int(),
  moves: z.lazy(() => MoveUncheckedCreateNestedManyWithoutPixelDexInputSchema).optional()
}).strict();

export const PixelDexCreateOrConnectWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexCreateOrConnectWithoutPixelmanInput> = z.object({
  where: z.lazy(() => PixelDexWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PixelDexCreateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutPixelmanInputSchema) ]),
}).strict();

export const PixelDexUpsertWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexUpsertWithoutPixelmanInput> = z.object({
  update: z.union([ z.lazy(() => PixelDexUpdateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutPixelmanInputSchema) ]),
  create: z.union([ z.lazy(() => PixelDexCreateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedCreateWithoutPixelmanInputSchema) ]),
  where: z.lazy(() => PixelDexWhereInputSchema).optional()
}).strict();

export const PixelDexUpdateToOneWithWhereWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexUpdateToOneWithWhereWithoutPixelmanInput> = z.object({
  where: z.lazy(() => PixelDexWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PixelDexUpdateWithoutPixelmanInputSchema),z.lazy(() => PixelDexUncheckedUpdateWithoutPixelmanInputSchema) ]),
}).strict();

export const PixelDexUpdateWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexUpdateWithoutPixelmanInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  moves: z.lazy(() => MoveUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const PixelDexUncheckedUpdateWithoutPixelmanInputSchema: z.ZodType<Prisma.PixelDexUncheckedUpdateWithoutPixelmanInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  frontImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  backImg: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  attack: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  defense: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  speed: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  moves: z.lazy(() => MoveUncheckedUpdateManyWithoutPixelDexNestedInputSchema).optional()
}).strict();

export const MoveCreateManyPixelDexInputSchema: z.ZodType<Prisma.MoveCreateManyPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  power: z.number().int(),
  accuracy: z.number().int()
}).strict();

export const PixelmanCreateManyPixelDexInputSchema: z.ZodType<Prisma.PixelmanCreateManyPixelDexInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MoveUpdateWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUpdateWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MoveUncheckedUpdateWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUncheckedUpdateWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MoveUncheckedUpdateManyWithoutPixelDexInputSchema: z.ZodType<Prisma.MoveUncheckedUpdateManyWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  power: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  accuracy: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanUpdateWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUpdateWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanUncheckedUpdateWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUncheckedUpdateWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PixelmanUncheckedUpdateManyWithoutPixelDexInputSchema: z.ZodType<Prisma.PixelmanUncheckedUpdateManyWithoutPixelDexInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PixelDexFindFirstArgsSchema: z.ZodType<Prisma.PixelDexFindFirstArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereInputSchema.optional(),
  orderBy: z.union([ PixelDexOrderByWithRelationInputSchema.array(),PixelDexOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelDexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelDexScalarFieldEnumSchema,PixelDexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelDexFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PixelDexFindFirstOrThrowArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereInputSchema.optional(),
  orderBy: z.union([ PixelDexOrderByWithRelationInputSchema.array(),PixelDexOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelDexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelDexScalarFieldEnumSchema,PixelDexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelDexFindManyArgsSchema: z.ZodType<Prisma.PixelDexFindManyArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereInputSchema.optional(),
  orderBy: z.union([ PixelDexOrderByWithRelationInputSchema.array(),PixelDexOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelDexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelDexScalarFieldEnumSchema,PixelDexScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelDexAggregateArgsSchema: z.ZodType<Prisma.PixelDexAggregateArgs> = z.object({
  where: PixelDexWhereInputSchema.optional(),
  orderBy: z.union([ PixelDexOrderByWithRelationInputSchema.array(),PixelDexOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelDexWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PixelDexGroupByArgsSchema: z.ZodType<Prisma.PixelDexGroupByArgs> = z.object({
  where: PixelDexWhereInputSchema.optional(),
  orderBy: z.union([ PixelDexOrderByWithAggregationInputSchema.array(),PixelDexOrderByWithAggregationInputSchema ]).optional(),
  by: PixelDexScalarFieldEnumSchema.array(),
  having: PixelDexScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PixelDexFindUniqueArgsSchema: z.ZodType<Prisma.PixelDexFindUniqueArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereUniqueInputSchema,
}).strict() ;

export const PixelDexFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PixelDexFindUniqueOrThrowArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereUniqueInputSchema,
}).strict() ;

export const MoveFindFirstArgsSchema: z.ZodType<Prisma.MoveFindFirstArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereInputSchema.optional(),
  orderBy: z.union([ MoveOrderByWithRelationInputSchema.array(),MoveOrderByWithRelationInputSchema ]).optional(),
  cursor: MoveWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MoveScalarFieldEnumSchema,MoveScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MoveFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MoveFindFirstOrThrowArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereInputSchema.optional(),
  orderBy: z.union([ MoveOrderByWithRelationInputSchema.array(),MoveOrderByWithRelationInputSchema ]).optional(),
  cursor: MoveWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MoveScalarFieldEnumSchema,MoveScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MoveFindManyArgsSchema: z.ZodType<Prisma.MoveFindManyArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereInputSchema.optional(),
  orderBy: z.union([ MoveOrderByWithRelationInputSchema.array(),MoveOrderByWithRelationInputSchema ]).optional(),
  cursor: MoveWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MoveScalarFieldEnumSchema,MoveScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MoveAggregateArgsSchema: z.ZodType<Prisma.MoveAggregateArgs> = z.object({
  where: MoveWhereInputSchema.optional(),
  orderBy: z.union([ MoveOrderByWithRelationInputSchema.array(),MoveOrderByWithRelationInputSchema ]).optional(),
  cursor: MoveWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MoveGroupByArgsSchema: z.ZodType<Prisma.MoveGroupByArgs> = z.object({
  where: MoveWhereInputSchema.optional(),
  orderBy: z.union([ MoveOrderByWithAggregationInputSchema.array(),MoveOrderByWithAggregationInputSchema ]).optional(),
  by: MoveScalarFieldEnumSchema.array(),
  having: MoveScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MoveFindUniqueArgsSchema: z.ZodType<Prisma.MoveFindUniqueArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereUniqueInputSchema,
}).strict() ;

export const MoveFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MoveFindUniqueOrThrowArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereUniqueInputSchema,
}).strict() ;

export const PixelmanFindFirstArgsSchema: z.ZodType<Prisma.PixelmanFindFirstArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereInputSchema.optional(),
  orderBy: z.union([ PixelmanOrderByWithRelationInputSchema.array(),PixelmanOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelmanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelmanScalarFieldEnumSchema,PixelmanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelmanFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PixelmanFindFirstOrThrowArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereInputSchema.optional(),
  orderBy: z.union([ PixelmanOrderByWithRelationInputSchema.array(),PixelmanOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelmanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelmanScalarFieldEnumSchema,PixelmanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelmanFindManyArgsSchema: z.ZodType<Prisma.PixelmanFindManyArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereInputSchema.optional(),
  orderBy: z.union([ PixelmanOrderByWithRelationInputSchema.array(),PixelmanOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelmanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PixelmanScalarFieldEnumSchema,PixelmanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PixelmanAggregateArgsSchema: z.ZodType<Prisma.PixelmanAggregateArgs> = z.object({
  where: PixelmanWhereInputSchema.optional(),
  orderBy: z.union([ PixelmanOrderByWithRelationInputSchema.array(),PixelmanOrderByWithRelationInputSchema ]).optional(),
  cursor: PixelmanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PixelmanGroupByArgsSchema: z.ZodType<Prisma.PixelmanGroupByArgs> = z.object({
  where: PixelmanWhereInputSchema.optional(),
  orderBy: z.union([ PixelmanOrderByWithAggregationInputSchema.array(),PixelmanOrderByWithAggregationInputSchema ]).optional(),
  by: PixelmanScalarFieldEnumSchema.array(),
  having: PixelmanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PixelmanFindUniqueArgsSchema: z.ZodType<Prisma.PixelmanFindUniqueArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereUniqueInputSchema,
}).strict() ;

export const PixelmanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PixelmanFindUniqueOrThrowArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const BattleFindFirstArgsSchema: z.ZodType<Prisma.BattleFindFirstArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereInputSchema.optional(),
  orderBy: z.union([ BattleOrderByWithRelationInputSchema.array(),BattleOrderByWithRelationInputSchema ]).optional(),
  cursor: BattleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BattleScalarFieldEnumSchema,BattleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BattleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BattleFindFirstOrThrowArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereInputSchema.optional(),
  orderBy: z.union([ BattleOrderByWithRelationInputSchema.array(),BattleOrderByWithRelationInputSchema ]).optional(),
  cursor: BattleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BattleScalarFieldEnumSchema,BattleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BattleFindManyArgsSchema: z.ZodType<Prisma.BattleFindManyArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereInputSchema.optional(),
  orderBy: z.union([ BattleOrderByWithRelationInputSchema.array(),BattleOrderByWithRelationInputSchema ]).optional(),
  cursor: BattleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BattleScalarFieldEnumSchema,BattleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BattleAggregateArgsSchema: z.ZodType<Prisma.BattleAggregateArgs> = z.object({
  where: BattleWhereInputSchema.optional(),
  orderBy: z.union([ BattleOrderByWithRelationInputSchema.array(),BattleOrderByWithRelationInputSchema ]).optional(),
  cursor: BattleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BattleGroupByArgsSchema: z.ZodType<Prisma.BattleGroupByArgs> = z.object({
  where: BattleWhereInputSchema.optional(),
  orderBy: z.union([ BattleOrderByWithAggregationInputSchema.array(),BattleOrderByWithAggregationInputSchema ]).optional(),
  by: BattleScalarFieldEnumSchema.array(),
  having: BattleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BattleFindUniqueArgsSchema: z.ZodType<Prisma.BattleFindUniqueArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereUniqueInputSchema,
}).strict() ;

export const BattleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BattleFindUniqueOrThrowArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereUniqueInputSchema,
}).strict() ;

export const PixelDexCreateArgsSchema: z.ZodType<Prisma.PixelDexCreateArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  data: z.union([ PixelDexCreateInputSchema,PixelDexUncheckedCreateInputSchema ]),
}).strict() ;

export const PixelDexUpsertArgsSchema: z.ZodType<Prisma.PixelDexUpsertArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereUniqueInputSchema,
  create: z.union([ PixelDexCreateInputSchema,PixelDexUncheckedCreateInputSchema ]),
  update: z.union([ PixelDexUpdateInputSchema,PixelDexUncheckedUpdateInputSchema ]),
}).strict() ;

export const PixelDexCreateManyArgsSchema: z.ZodType<Prisma.PixelDexCreateManyArgs> = z.object({
  data: z.union([ PixelDexCreateManyInputSchema,PixelDexCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PixelDexCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PixelDexCreateManyAndReturnArgs> = z.object({
  data: z.union([ PixelDexCreateManyInputSchema,PixelDexCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PixelDexDeleteArgsSchema: z.ZodType<Prisma.PixelDexDeleteArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  where: PixelDexWhereUniqueInputSchema,
}).strict() ;

export const PixelDexUpdateArgsSchema: z.ZodType<Prisma.PixelDexUpdateArgs> = z.object({
  select: PixelDexSelectSchema.optional(),
  include: PixelDexIncludeSchema.optional(),
  data: z.union([ PixelDexUpdateInputSchema,PixelDexUncheckedUpdateInputSchema ]),
  where: PixelDexWhereUniqueInputSchema,
}).strict() ;

export const PixelDexUpdateManyArgsSchema: z.ZodType<Prisma.PixelDexUpdateManyArgs> = z.object({
  data: z.union([ PixelDexUpdateManyMutationInputSchema,PixelDexUncheckedUpdateManyInputSchema ]),
  where: PixelDexWhereInputSchema.optional(),
}).strict() ;

export const PixelDexDeleteManyArgsSchema: z.ZodType<Prisma.PixelDexDeleteManyArgs> = z.object({
  where: PixelDexWhereInputSchema.optional(),
}).strict() ;

export const MoveCreateArgsSchema: z.ZodType<Prisma.MoveCreateArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  data: z.union([ MoveCreateInputSchema,MoveUncheckedCreateInputSchema ]),
}).strict() ;

export const MoveUpsertArgsSchema: z.ZodType<Prisma.MoveUpsertArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereUniqueInputSchema,
  create: z.union([ MoveCreateInputSchema,MoveUncheckedCreateInputSchema ]),
  update: z.union([ MoveUpdateInputSchema,MoveUncheckedUpdateInputSchema ]),
}).strict() ;

export const MoveCreateManyArgsSchema: z.ZodType<Prisma.MoveCreateManyArgs> = z.object({
  data: z.union([ MoveCreateManyInputSchema,MoveCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MoveCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MoveCreateManyAndReturnArgs> = z.object({
  data: z.union([ MoveCreateManyInputSchema,MoveCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MoveDeleteArgsSchema: z.ZodType<Prisma.MoveDeleteArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  where: MoveWhereUniqueInputSchema,
}).strict() ;

export const MoveUpdateArgsSchema: z.ZodType<Prisma.MoveUpdateArgs> = z.object({
  select: MoveSelectSchema.optional(),
  include: MoveIncludeSchema.optional(),
  data: z.union([ MoveUpdateInputSchema,MoveUncheckedUpdateInputSchema ]),
  where: MoveWhereUniqueInputSchema,
}).strict() ;

export const MoveUpdateManyArgsSchema: z.ZodType<Prisma.MoveUpdateManyArgs> = z.object({
  data: z.union([ MoveUpdateManyMutationInputSchema,MoveUncheckedUpdateManyInputSchema ]),
  where: MoveWhereInputSchema.optional(),
}).strict() ;

export const MoveDeleteManyArgsSchema: z.ZodType<Prisma.MoveDeleteManyArgs> = z.object({
  where: MoveWhereInputSchema.optional(),
}).strict() ;

export const PixelmanCreateArgsSchema: z.ZodType<Prisma.PixelmanCreateArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  data: z.union([ PixelmanCreateInputSchema,PixelmanUncheckedCreateInputSchema ]),
}).strict() ;

export const PixelmanUpsertArgsSchema: z.ZodType<Prisma.PixelmanUpsertArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereUniqueInputSchema,
  create: z.union([ PixelmanCreateInputSchema,PixelmanUncheckedCreateInputSchema ]),
  update: z.union([ PixelmanUpdateInputSchema,PixelmanUncheckedUpdateInputSchema ]),
}).strict() ;

export const PixelmanCreateManyArgsSchema: z.ZodType<Prisma.PixelmanCreateManyArgs> = z.object({
  data: z.union([ PixelmanCreateManyInputSchema,PixelmanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PixelmanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PixelmanCreateManyAndReturnArgs> = z.object({
  data: z.union([ PixelmanCreateManyInputSchema,PixelmanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PixelmanDeleteArgsSchema: z.ZodType<Prisma.PixelmanDeleteArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  where: PixelmanWhereUniqueInputSchema,
}).strict() ;

export const PixelmanUpdateArgsSchema: z.ZodType<Prisma.PixelmanUpdateArgs> = z.object({
  select: PixelmanSelectSchema.optional(),
  include: PixelmanIncludeSchema.optional(),
  data: z.union([ PixelmanUpdateInputSchema,PixelmanUncheckedUpdateInputSchema ]),
  where: PixelmanWhereUniqueInputSchema,
}).strict() ;

export const PixelmanUpdateManyArgsSchema: z.ZodType<Prisma.PixelmanUpdateManyArgs> = z.object({
  data: z.union([ PixelmanUpdateManyMutationInputSchema,PixelmanUncheckedUpdateManyInputSchema ]),
  where: PixelmanWhereInputSchema.optional(),
}).strict() ;

export const PixelmanDeleteManyArgsSchema: z.ZodType<Prisma.PixelmanDeleteManyArgs> = z.object({
  where: PixelmanWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const BattleCreateArgsSchema: z.ZodType<Prisma.BattleCreateArgs> = z.object({
  select: BattleSelectSchema.optional(),
  data: z.union([ BattleCreateInputSchema,BattleUncheckedCreateInputSchema ]),
}).strict() ;

export const BattleUpsertArgsSchema: z.ZodType<Prisma.BattleUpsertArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereUniqueInputSchema,
  create: z.union([ BattleCreateInputSchema,BattleUncheckedCreateInputSchema ]),
  update: z.union([ BattleUpdateInputSchema,BattleUncheckedUpdateInputSchema ]),
}).strict() ;

export const BattleCreateManyArgsSchema: z.ZodType<Prisma.BattleCreateManyArgs> = z.object({
  data: z.union([ BattleCreateManyInputSchema,BattleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BattleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BattleCreateManyAndReturnArgs> = z.object({
  data: z.union([ BattleCreateManyInputSchema,BattleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BattleDeleteArgsSchema: z.ZodType<Prisma.BattleDeleteArgs> = z.object({
  select: BattleSelectSchema.optional(),
  where: BattleWhereUniqueInputSchema,
}).strict() ;

export const BattleUpdateArgsSchema: z.ZodType<Prisma.BattleUpdateArgs> = z.object({
  select: BattleSelectSchema.optional(),
  data: z.union([ BattleUpdateInputSchema,BattleUncheckedUpdateInputSchema ]),
  where: BattleWhereUniqueInputSchema,
}).strict() ;

export const BattleUpdateManyArgsSchema: z.ZodType<Prisma.BattleUpdateManyArgs> = z.object({
  data: z.union([ BattleUpdateManyMutationInputSchema,BattleUncheckedUpdateManyInputSchema ]),
  where: BattleWhereInputSchema.optional(),
}).strict() ;

export const BattleDeleteManyArgsSchema: z.ZodType<Prisma.BattleDeleteManyArgs> = z.object({
  where: BattleWhereInputSchema.optional(),
}).strict() ;