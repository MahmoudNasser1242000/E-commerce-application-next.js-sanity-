import { LucideIcon } from "lucide-react";

export interface INavLinks {
    href: string;
    label: string;
    icon: LucideIcon
}

export interface ISocialMediaLinks {
    title: string;
    href: string;
    icon: LucideIcon
}

// schemas
export interface IProducts {
    _id: string
    title: string;
    description: string;
    image: {
        _type: string;
        _key?: number;
        asset: {
            _ref: string;
            _type: string;
        };
    }
    price: number;
    instantDelivery: boolean;
    category: string
}

export interface ICart {
    _id: string;
    username: string;
    email: string;
    products: IProducts[];
}

//context
export type TState = {
    cart: ICart;
};

export type TAction =
    | { type: "FETCH_CART"; payload: ICart }
    | { type: "ADD_TO_CART"; payload: ICart }
    | { type: "REMOVE_FROM_CART"; payload: ICart } // Assuming payload is a product ID
    | { type: "CLEAR_CART", payload: ICart };

export interface ICartContext {
    state: TState;
    dispatch: React.Dispatch<TAction>;
    fetchCart: (email: string | undefined) => Promise<void>;
    addProduct: (email: string | undefined, username: string | null | undefined, productId: string, theme: "light" | "dark") => Promise<void>;
    removeProduct: (email: string | undefined, productId: string, theme: "light" | "dark") => Promise<void>;
    clearCart: (email: string | undefined, theme: "light" | "dark", allow: boolean) => Promise<void>;
}