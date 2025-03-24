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

export default function PaginationDemo({ total, page  }: { total: number, page : number }) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/Products?page=${(page - 1 <= 0 ? 1 : page - 1)}`} />
                </PaginationItem>
                {
                    Array.from({ length: Math.ceil(total) }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href={`/Products?page=${index + 1}`}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href={`/Products?page=${(page + 1 >= Math.ceil(total) ? Math.ceil(total) : page + 1)}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
