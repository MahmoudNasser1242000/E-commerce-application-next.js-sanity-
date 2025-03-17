import { getProducts } from "@/lib/products";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IProducts } from "@/types";
import SectionTitle from "@/components/Section-Title/SectionTitle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProductList = async () => {
    const products = await getProducts();
    return <section className="container mx-auto">
        <SectionTitle title="Featured Products" desc=" Find the best deals on trending items!" />
        <div className="flex justify-center sm:justify-between items-center flex-wrap gap-y-34 mt-14">
            {products.slice(0, 4).map((product: IProducts) => <ProductCard key={product._id} product={product} />)}
        </div>
        <div className="flex justify-center items-center mt-44">
            <Link href={""} className={cn(buttonVariants({ variant: "default", className: "px-8 py-5 rounded-sm text-white" }))}>
                See More Products <span className="ml-2">→</span>
            </Link>
        </div>
    </section>
};

export default ProductList;
