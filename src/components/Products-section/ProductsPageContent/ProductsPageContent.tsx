"use client";
import React, { useCallback, useEffect, useState } from "react";
import PriceFilter from "@/components/PriceFilter/PriceFilter";
import { IProducts } from "@/types/index";
import { getProducts, getProductsWithFilteration } from "@/lib/products";
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
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsPageContent = ({
    page,
    category = "",
}: {
    page: number;
    category: string;
}) => {
    const [products, setProducts] = useState<IProducts[]>();
    const [fromPrice, setFromPrice] = useState<number>(0);
    const [toPrice, setToPrice] = useState<number>(0);
    const [highPrice, setHighPrice] = useState<number>(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");

    const limit = 10;

    const getAllProducts = async (
        fromPrice: number,
        toPrice: number,
        category: string,
        keyword: string,
        sortBy: string,
        page: number,
        limit: number
    ) => {
        const products = await getProductsWithFilteration(
            fromPrice,
            toPrice,
            category,
            keyword,
            sortBy,
            page,
            limit
        );
        setProducts(products);
    };
    const getTotelProductsPrice = async () => {
        const products = await getProducts();
        const prices = products.map((product) => product.price);
        setHighPrice(Math.max(...prices));
    };
    const getAllCategories = async () => {
        const products = await getProducts();
        const categories = products.map((product) => product.category);
        setCategories(Array.from(new Set(categories)));
    };

    const getTotalProductsLength = useCallback(async () => {
        const products = await getProducts(fromPrice, toPrice, category, keyword);
        console.log(products);

        setTotal(products.length);
    }, [fromPrice, toPrice, keyword, category]);

    useEffect(() => {
        getAllProducts(fromPrice, toPrice, category, keyword, sortBy, page, limit);
    }, [fromPrice, toPrice, category, page, keyword, sortBy, limit]);
    useEffect(() => {
        getTotelProductsPrice();
    }, []);
    useEffect(() => {
        getAllCategories();
    }, []);
    useEffect(() => {
        getTotalProductsLength();
    }, [getTotalProductsLength]);

    const router = useRouter();

    return (
        <div className="pt-34 container sm:mx-auto px-4" id="goTop">
            <div className="flex justify-between items-center flex-wrap px-0 sm:px-4 gap-4">
                <div className="w-full sm:w-[48%] lg:w-[40%]">
                    <Select
                        value={category ? category : "all"}
                        onValueChange={(value) => {
                            router.push(
                                `/Products${value !== "all" ? `?category=${value}` : ""}`
                            );
                        }}
                    >
                        <SelectTrigger className="w-full py-[26px] px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-sm flex items-center justify-between gap-2 text-gray-900 dark:text-white">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"all"}>All</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <PriceFilter
                    highPrice={highPrice}
                    fromPrice={fromPrice}
                    setFromPrice={setFromPrice}
                    toPrice={toPrice}
                    setToPrice={setToPrice}
                />
            </div>
            <div className="flex items-center justify-center pt-10 pb-8">
                <label htmlFor="search" className="w-full sm:w-[50%]">
                    <Input
                        placeholder="Search by title..."
                        type="search"
                        id="search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="mt-0.5 px-2 w-full py-[26px] rounded border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm dark:bg-gray-900 dark:text-white"
                    />
                </label>
            </div>
            <div className="flex items-center justify-between mt-8 mb-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className="rounded-sm focus:ring-none cursor-pointer p-5"
                        >
                            <ArrowDownWideNarrow className="size-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                setSortBy("");
                            }}
                        >
                            Default
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setSortBy("title asc");
                            }}
                        >
                            Title
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setSortBy("price desc");
                            }}
                        >
                            High Price
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setSortBy("price asc");
                            }}
                        >
                            Low Price
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-34 mt-8">
                {products ? (
                    products.length ? (
                        products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <h2 className="px-6 py-8 text-2xl col-span-4">
                            {`You don't have any products right now!`}
                        </h2>
                    )
                ) : (
                    Array.from({ length: 4 }, (_, index) => (
                        <ProductCardLoading key={index} />
                    ))
                )}
            </div>

            <div className="mt-52 flex justify-center items-center">
                <PaginationDemo
                    total={total / limit}
                    page={page}
                    type="Products"
                    category={category}
                />
            </div>
        </div>
    );
};

export default ProductsPageContent;
