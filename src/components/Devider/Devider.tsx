import { Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const Devider = ({productTitle}: {productTitle: string}) => {
    return <div>
        <nav aria-label="Breadcrumb" className="px-4 flex">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600">
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex h-full sm:h-12 items-center gap-1.5 bg-gray-200 dark:bg-primary dark:text-white px-4 transition hover:text-gray-900"
                    >
                        <Home size={20} />

                        <span className="ms-1.5 text-xs font-medium"> Home </span>
                    </Link>
                </li>

                <li className="flex items-center">
                    <Link
                        href="/products"
                        className="flex h-full sm:h-12 items-center gap-1.5 bg-gray-200 dark:bg-primary dark:text-white px-4 transition hover:text-gray-900"
                    >
                        <ShoppingBag size={20} />
                        <span className="ms-1.5 text-xs font-medium"> Products </span>
                    </Link>
                </li>

                <li className="relative flex items-center">
                    <span
                        className="absolute inset-y-0 -start-px w-4 bg-gray-200 dark:bg-primary [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
                    >
                    </span>

                    <span
                        className="flex items-center h-full sm:h-12 line-clamp-1 bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
                    >
                        {productTitle}
                    </span>
                </li>
            </ol>
        </nav>
    </div>;
};

export default Devider;
