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
} from "@/components/ui/select"

const page = () => {
    const [products, setProducts] = useState<IProducts[]>();
    const [fromPrice, setFromPrice] = useState<number>(0);
    const [toPrice, setToPrice] = useState<number>(0);
    const [highPrice, setHighPrice] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("none");

    const getAllProducts = async (fromPrice: number, toPrice: number, category: string) => {
        const products = await getProductsByPriceRange(fromPrice, toPrice, category);
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
        getAllProducts(fromPrice, toPrice, category);
    }, [fromPrice, toPrice, category]);
    useEffect(() => {
        getTotelProductsPrice();
    }, []);
    useEffect(() => {
        getAllCategories();
    }, []);
    return <div className="pt-34 container sm:mx-auto px-4">
        <div className="flex justify-between items-center flex-wrap px-4 gap-4">
            <div className="w-full sm:w-[48%] lg:w-[40%]">
                <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-full py-[26px] px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-sm flex items-center justify-between gap-2 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"none"}>Category</SelectItem>
                        {
                            categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <PriceFilter highPrice={highPrice} fromPrice={fromPrice} setFromPrice={setFromPrice} toPrice={toPrice} setToPrice={setToPrice} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-34 mt-8">
            {
                products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    </div>;
};

export default page;
