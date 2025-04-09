import Devider from "@/components/Devider/Devider";
import ProductDetailsSkeleton from "@/components/Products-section/ProductDetailsLoading/ProductDetailsLoading";
import ProductDetails from "@/components/Products-section/ProductDetails/ProductDetails";
import { getOneProduct, getProducts } from "@/lib/products";
import React from "react";
import ProductsCarousel from "@/components/Cart/Carousel/ProductsCarousel";
import SectionTitle from "@/components/Section-Title/SectionTitle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type TParams = Promise<{ productId: string }>

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({ productId: product._id }));
}
const ProductDetailsPage = async ({ params }: { params: TParams }) => {
    const product = await getOneProduct((await params).productId);
    return (
        <div className="pt-34 container mx-auto" id="goTop">
            <Devider productTitle={product.title} />
            {product ? <ProductDetails product={product} /> : <ProductDetailsSkeleton />}
            {product && (
                <div className="pt-40 pb-18">
                    <SectionTitle title="Related Products" desc="Explore handpicked selection of products" />
                    <div className="mt-8 flex justify-center">
                        <ProductsCarousel category={product.category} productId={product._id} />
                    </div>
                    <div className="flex justify-center items-center mt-16 sm:mt-8">
                        <Link href={`/Products?page=1&category=${product.category}`} className={cn(buttonVariants({ variant: "default", className: "px-8 py-5 rounded-sm text-white" }))}>
                            See More Products... <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
