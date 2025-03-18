import { type SchemaTypeDefinition } from 'sanity'
import products from '../schemas/products'
import cart from '../schemas/cart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, cart],
}
