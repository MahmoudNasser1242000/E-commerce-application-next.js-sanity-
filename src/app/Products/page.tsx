import ProductsPageContent from "@/components/Products-section/ProductsPageContent/ProductsPageContent";

type TParams = Promise<{page: string}>

const Products = async ({ searchParams }: { searchParams: TParams }) => {
    const page = Number((await searchParams).page) || 1;
    return <>
        <ProductsPageContent page={page} />
    </>;
};

export default Products;
