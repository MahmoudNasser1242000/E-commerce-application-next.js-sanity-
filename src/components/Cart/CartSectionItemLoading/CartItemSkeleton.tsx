import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CartItemSkeleton = () => {
    return <>
        <li className="flex items-center justify-start w-full gap-4 h-fit p-2">
            {/* Image Skeleton */}
            <Skeleton className="h-16 w-20 rounded-sm" />

            <div className="flex flex-col w-full space-y-2">
                {/* Title Skeleton */}
                <Skeleton className="h-4 w-2/3" />

                <dl className="mt-0.5 space-y-1 text-[10px]">
                    <div className="space-x-1 flex">
                        <Skeleton className="h-3 w-12" />
                    </div>

                    <div className="space-x-1 flex">
                        <Skeleton className="h-3 w-16" />
                    </div>
                </dl>
            </div>
        </li>
    </>;
};

export default CartItemSkeleton;
