import { client } from "@/sanity/lib/client"
import { addToast } from "./toast";

export const getMyCart = async (email: string | undefined) => {
    const query = `*[_type == "cart" && email == $email]{
        _id,
        username,
        email,
        products[]->{_id, title, description, price, image, instantDelivery, category}
    }[0]`;
    const cart = await client.fetch(query, { email });
    return cart
};

export const addProductToCart = async (email: string | undefined, username: string | null | undefined, productId: string, theme: "light" | "dark" = "light") => {
    // Step 1: Check if the cart exists for the user
    const cart = await getMyCart(email);

    if (cart) {
        // Step 2: If the cart exists, check if the product exist and update the cart by adding the product

        const query = `
            *[_type == "cart" && email == $email && $productId in products[]._ref] {
                _id
            }[0]
        `;
        const isProduct = await client.fetch(query, { email, productId });
        if (!isProduct) {
            const mutation = [{
                patch: {
                    id: cart._id,
                    setIfMissing: { products: [] }, // Ensure products array exists
                    insert: {
                        after: "products[-1]", // Add product at the end of the array
                        items: [{ _type: "reference", _ref: productId, _key: productId }],
                    },
                },
            }]
    
            await client.transaction(mutation).commit();
            addToast("success", "Product added to cart successfully", theme);
        } else {
            addToast("warn", "Product already eisxts!", theme);
            return;
        }
    } else {
        // Step 3: If the cart does not exist, create a new one
        const newCart = {
            _type: "cart",
            username,
            email,
            products: [{ _type: "reference", _ref: productId, _key: productId }],
        };

        await client.create(newCart);
        addToast("success", "Cart created and product added successfully", theme);
    }
};