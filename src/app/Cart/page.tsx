import CartPageContent from "@/components/Cart/CartPageContent/CartPageContent";

export default function Cart({ searchParams }: { searchParams: { page: string } }) {
    const page = Number(searchParams.page) || 1;

    return (
        <>
            <CartPageContent page={page} />
        </>
    );
}