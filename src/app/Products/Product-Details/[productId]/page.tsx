import Devider from "@/components/Devider/Devider";
import ProductDetailsSkeleton from "@/components/Products-section/ProductDetailsLoading/ProductDetailsLoading";
import ProductDetails from "@/components/Products-section/ProductDetails/ProductDetails";
import { getOneProduct, getProducts } from "@/lib/products";
import React from "react";
import { GetServerSidePropsContext } from "next";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({ productId: product._id }));
}
const ProductDetailsPage = async ({ params }: GetServerSidePropsContext<{ productId: string }>) => {
    const product = await getOneProduct(params?.productId!)
    return <div className="pt-34 container mx-auto">
        <Devider productTitle={product.title} />
        {product? <ProductDetails product={product} /> : <ProductDetailsSkeleton />}
    </div>;
};

export default ProductDetailsPage;
