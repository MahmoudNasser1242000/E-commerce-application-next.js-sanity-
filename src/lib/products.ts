import { IProducts } from "@/types";
import { client } from "@/sanity/lib/client";

export const getProducts = async (
    minPrice: number = 0,
    maxPrice: number = 0,
    category: string = "",
    keyword: string = ""
) => {
    const query = `
        *[_type=="products"
            ${!category ? "" : `&& category==$category`} && 
            ${maxPrice ? `price >= $minPrice && price <= $maxPrice` : `price >= $minPrice`}
            ${keyword ? `&& title match "*${keyword}*"` : ""}]{
            _id, 
            title, 
            description, 
            image,
            instantDelivery, 
            price,
            category, 
            publishedAt,
        }[]
    `;

    const projects = await client.fetch(query, {
        minPrice,
        maxPrice,
        category,
        keyword,
    });
    return projects as IProducts[];
};

export const getProductsWithCategory = async (category: string) => {
    const query = `
        *[_type=="products" && category==$category]{
            _id, 
            title, 
            description, 
            image,
            instantDelivery, 
            price,
            category, 
            publishedAt,
        }[]
    `;

    const projects = await client.fetch(query, { category });
    return projects as IProducts[];
};

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

export const getProductsWithFilteration = async (
    minPrice: number,
    maxPrice: number,
    category: string,
    keyword: string,
    sortBy: string,
    page: number = 1,
    limit: number = 10
) => {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const query = `
        *[_type == "products" 
            ${!category ? "" : `&& category==$category`} && 
            ${maxPrice ? `price >= $minPrice && price <= $maxPrice` : `price >= $minPrice`}
            ${keyword ? `&& title match "*${keyword}*"` : ""}] | order(${sortBy ? sortBy : "createdAt desc"}) [${start}..${end}] {
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

    const products = await client.fetch(query, {
        minPrice,
        maxPrice,
        category,
        keyword,
        sortBy,
        page,
        limit
    });
    return products as IProducts[];
};
