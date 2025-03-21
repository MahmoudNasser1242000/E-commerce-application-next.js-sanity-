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

export const getProductsByPriceRange = async (minPrice: number, maxPrice: number, category: string) => {
    const query = `
        *[_type == "products" ${category === "none" ? "" : `&& category==$category`} && ${maxPrice ? `price >= $minPrice && price <= $maxPrice` : `price >= $minPrice`}] {
            _id, 
            title, 
            description, 
            image,
            instantDelivery, 
            price,
            category, 
            publishedAt
        }[]
    `;

    const products = await client.fetch(query, { minPrice, maxPrice, category });
    return products as IProducts[];
};