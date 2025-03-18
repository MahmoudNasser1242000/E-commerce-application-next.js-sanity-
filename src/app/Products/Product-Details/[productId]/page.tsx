import Devider from "@/components/Devider/Devider";
import ProductDetails from "@/components/Products-section/ProductDetails/ProductDetails";
import { getOneProduct } from "@/lib/products";
import React from "react";

const page = async ({params}: {params: {productId:string}}) => {
    const product = await getOneProduct(params.productId)
    // console.log('====================================');
    // console.log(product);
    // console.log('====================================');
    return <div className="pt-34 container mx-auto">
        <Devider productId={params.productId} />
        <ProductDetails product={product} />
    </div>;
};

export default page;
