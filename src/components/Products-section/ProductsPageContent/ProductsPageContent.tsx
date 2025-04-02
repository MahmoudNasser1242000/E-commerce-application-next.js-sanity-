"use client"
import React, { useEffect, useState } from "react";
import PriceFilter from "@/components/PriceFilter/PriceFilter";
import { IProducts } from "@/types/index";
import { getProducts, getProductsByPriceRange } from "@/lib/products";
import ProductCard from "@/components/Home-Section/ProductCard/ProductCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PaginationDemo from "@/components/Pagination/Pagination";
import ProductCardLoading from "@/components/ProductCardLoading/ProductCardLoading";
import { useRouter } from "next/navigation";

const ProductsPageContent = ({ page, category = "" }: { page: number, category: string }) => {
    const [products, setProducts] = useState<IProducts[]>();
    const [fromPrice, setFromPrice] = useState<number>(0);
    const [toPrice, setToPrice] = useState<number>(0);
    const [highPrice, setHighPrice] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [total, setTotal] = useState<number>(0);

    const limit = 10;

    const getTotalProductsLength = async () => {
        const products = await getProducts();
        setTotal(products?.length)
    }

    const getAllProducts = async (fromPrice: number, toPrice: number, category: string, page: number) => {
        const products = await getProductsByPriceRange(fromPrice, toPrice, category, page, limit);
        setProducts(products)
    }
    const getTotelProductsPrice = async () => {
        const products = await getProducts();
        const prices = products.map(product => product.price);
        setHighPrice(Math.max(...prices));
    }
    const getAllCategories = async () => {
        const products = await getProducts();
        const categories = products.map(product => product.category);
        setCategories(Array.from(new Set(categories)));
    }

    useEffect(() => {
        getAllProducts(fromPrice, toPrice, category, page);
    }, [fromPrice, toPrice, category, page]);
    useEffect(() => {
        getTotelProductsPrice();
    }, []);
    useEffect(() => {
        getAllCategories();
    }, []);
    useEffect(() => {
        if (category) {
            setTotal(products?.length as number);
        } else {
            getTotalProductsLength();
        }
    }, [category, products]);

    const router = useRouter();
    
    return <div className="pt-34 container sm:mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap px-4 gap-4">
            <div className="w-full sm:w-[48%] lg:w-[40%]">
                <Select value={category? category : "all"} onValueChange={(value) => { router.push(`/Products?page=${page}${value !== "all" ? `&category=${value}` : ""}`) }}>
                    <SelectTrigger className="w-full py-[26px] px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-sm flex items-center justify-between gap-2 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"all"}>
                            Category
                        </SelectItem>
                        {
                            categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <PriceFilter highPrice={highPrice} fromPrice={fromPrice} setFromPrice={setFromPrice} toPrice={toPrice} setToPrice={setToPrice} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-34 mt-8">
            {
                products ? (
                    products.length ? (
                        products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <h2 className="px-6 py-8 text-2xl col-span-4">
                            You have not any products right now!
                        </h2>
                    )
                ) : (
                    Array.from({ length: 4 }, (_, index) => <ProductCardLoading key={index} />)
                )
            }
        </div>

        <div className="mt-52 flex justify-center items-center">
            <PaginationDemo total={total / limit} page={page} type="Products" category={category} />
        </div>
    </div>;
};

export default ProductsPageContent;
