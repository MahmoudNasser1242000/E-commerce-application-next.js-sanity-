"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationDemo({ total, page, type, category  }: { total: number, page : number, type: string, category?: string }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/${type}?page=${(page - 1 <= 0 ? 1 : page - 1)}${(type === "Products" && category) && `&category=${category}`}`} />
                </PaginationItem>
                {
                    Array.from({ length: Math.ceil(total) }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href={`/${type}?page=${index + 1}${(type === "Products" && category) && `&category=${category}`}`}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`/${type}?page=${(page + 1 >= Math.ceil(total) ? Math.ceil(total) : page + 1)}${(type === "Products" && category) && `&category=${category}`}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
