import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductCardLoading = () => {
    return <div className="group h-[300px] rounded-sm">
        {/* Image Skeleton */}
        <div className="h-[60%] overflow-hidden border border-b-0 dark:border-none rounded-t-sm">
            <Skeleton className="w-full h-full rounded-t-sm rounded-b-none" />
        </div>

        {/* Content Skeleton */}
        <div className="border p-6">
            {/* Price Skeleton */}
            <Skeleton className="h-4 w-1/3 mb-4" />

            {/* Title Skeleton */}

            {/* Description Skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />

            {/* Buttons Skeleton */}
            <div className="mt-4 flex justify-center gap-4">
                <Skeleton className="h-10 w-[50%] rounded-sm" />
                <Skeleton className="h-10 w-[50%] rounded-sm" />
            </div>
        </div>
    </div>;
};
export default ProductCardLoading;