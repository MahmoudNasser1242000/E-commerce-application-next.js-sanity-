import Devider from "@/components/Devider/Devider";
import ProductDetails from "@/components/Products-section/ProductDetails/ProductDetails";
import { getOneProduct, getProducts } from "@/lib/products";
import React from "react";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => [{ productId: product._id }])
}
const page = async ({params}: {params: {productId:string}}) => {
    const product = await getOneProduct(params.productId)
    // console.log('====================================');
    // console.log(product);
    // console.log('====================================');
    return <div className="pt-34 container mx-auto">
        <Devider productTitle={product.title} />
        <ProductDetails product={product} />
    </div>;
};

export default page;
