"use client";
import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getProductsWithCategory } from "@/lib/products";
import { IProducts } from "@/types";
import ProductCard from "@/components/Home-Section/ProductCard/ProductCard";

const ProductsCarousel = ({
    category,
    productId,
}: {
    category: string;
    productId: string;
}) => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    const [products, setProducts] = useState<IProducts[]>([]);

    const getRelatedProducts = async () => {
        const products = await getProductsWithCategory(category);
        setProducts(products);
    };
    useEffect(() => {
        if (category) {
            getRelatedProducts();
        }
    }, [category]);
    return (
        <div className="flex justify-center items-center ml-4 sm:ml-0">
            <Carousel
                className="max-w-xs h-full"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="pb-24 flex">
                    {products
                        ?.filter((product) => product._id !== productId)
                        .slice(0, 10)
                        .map((product: IProducts) => (
                            <CarouselItem
                                key={product._id}
                                className="flex aspect-square items-center w-full justify-center p-6"
                            >
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious className="top-[103%] left-[36%] sm:top-[50%] sm:left-[-52px]"/>
                <CarouselNext className="top-[103%] left-[49%] sm:top sm:top-[50%] sm:left-[103%]" />
            </Carousel>
        </div>
    );
};

export default ProductsCarousel;
