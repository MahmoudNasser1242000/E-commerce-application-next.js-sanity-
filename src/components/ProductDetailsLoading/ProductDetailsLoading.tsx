import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
    return (
        <section className="overflow-hidden mx-4 rounded-lg shadow-2xl dark:shadow-gray-700 md:grid md:grid-cols-3 my-24">
            {/* Image Skeleton */}
            <div className="overflow-hidden">
                <Skeleton className="w-full h-[400px] md:h-full" />
            </div>

            {/* Text Content Skeleton */}
            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                <Skeleton className="w-1/3 h-5 mx-auto" />

                <div className="mt-6">
                    <Skeleton className="w-3/4 h-12 mx-auto" />
                    
                </div>

                <Skeleton className="mt-6 w-5/6 h-16 mx-auto" />

                {/* Button Skeleton */}
                <Skeleton className="flex w-full h-14 my-6" />

                {/* Delivery Status Skeleton */}
                <div className="mt-8 flex justify-center gap-2">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-40 h-6" />
                </div>
            </div>
        </section>
    );
}
