import { IProducts } from '@/types';
import { client } from "@/sanity/lib/client"

export const getProducts = async () => {
    const query =
        `
        *[_type=="products"]{
            _id, 
            title, 
            description, 
            image,
            instantDelivery, 
            price,
            category, 
            publishedAt,
        }[]
    `

    const projects = await client.fetch(query)
    return projects as IProducts[]
}

export const getOneProduct = async (productId: string) => {
    const query = `
        *[_type == "products" && _id == $productId][0] {
            _id, 
            title, 
            description, 
            image,
            instantDelivery, 
            price,
            category, 
            publishedAt
        }
    `;

    const product = await client.fetch(query, { productId }); // ✅ Pass parameter separately
    return product as IProducts; // ✅ Returns a single product (not an array)
};
