import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CartPageItemSkeleton = () => {
    return <>
        <li className="flex items-center gap-4 p-2">
            {/* Image Skeleton */}
            <div className="overflow-hidden">
                <Skeleton className="h-28 w-34 rounded-sm" />
            </div>

            <div className="flex flex-col w-full space-y-2">
                {/* Title Skeleton */}
                <Skeleton className="h-5 w-2/3" />

                <dl className="mt-0.5 space-y-1 text-[12px]">
                    <div className="space-x-1 flex">
                        <Skeleton className="h-3 w-14" />
                    </div>

                    <div className="space-x-1 flex">
                        <Skeleton className="h-3 w-20" />
                    </div>
                </dl>
            </div>

            {/* Delete Button Skeleton */}
            <div className="flex flex-1 items-center justify-end gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
            </div>
        </li>
    </>;
};

export default CartPageItemSkeleton;
