import { type SchemaTypeDefinition } from 'sanity'
import products from '../schemas/products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products],
}
