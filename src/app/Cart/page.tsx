import CartPageContent from "@/components/Cart/CartPageContent/CartPageContent";

type TParams = Promise<{page: string}>
export default async function Cart({ searchParams }: { searchParams: TParams }) {
    const page = Number((await searchParams).page) || 1;

    return (
        <>
            <CartPageContent page={page} />
        </>
    );
}