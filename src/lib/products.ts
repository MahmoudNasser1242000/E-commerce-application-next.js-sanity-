import { client } from "@/sanity/lib/client"
import { IProducts } from "@/types"

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