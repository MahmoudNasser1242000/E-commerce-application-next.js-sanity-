import ProductsPageContent from "@/components/Products-section/ProductsPageContent/ProductsPageContent";

type TParams = Promise<{page: string, category: string}>

const Products = async ({ searchParams }: { searchParams: TParams }) => {
    const page = Number((await searchParams).page) || 1;
    const category = (await searchParams).category;
    return <>
        <ProductsPageContent page={page} category={category} />
    </>;
};

export default Products;
