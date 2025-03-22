"use client";
import { addProductToCart, clearCartProducts, deleteProductFromCart, getMyCart } from "@/lib/cart";
import { ICartContext, TAction, TState } from "@/types";
import React, { useReducer } from "react";

const cartContect = React.createContext<ICartContext>(
    {} as ICartContext
);
const Cart = ({children}: {children: React.ReactNode}) => {
    const reducerActions = (state: TState, action: TAction) => {
        const { type } = action;
        switch (type) {
            case "FETCH_CART":
                return { ...state, cart: action.payload };
            case "ADD_TO_CART":
                return { ...state, cart: action.payload };
            case "REMOVE_FROM_CART":
                return { ...state, cart: action.payload };
            case "CLEAR_CART":
                return {...state, cart: action.payload};
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducerActions, { cart: null });

    const fetchCart = async (email: string | undefined) => {
        const cart = await getMyCart(email);
        dispatch({ type: "FETCH_CART", payload: cart });
    }
    const addProduct = async (email: string | undefined, username: string | null | undefined, productId: string, theme: "light" | "dark" = "light") => {
        if (email) {
            await addProductToCart(email, username, productId, theme);
            const updatedCart = await getMyCart(email);
            dispatch({ type: "ADD_TO_CART", payload: updatedCart });
        }
    }
    const removeProduct = async (email: string | undefined, productId: string, theme: "light" | "dark" = "light") => {
        if (email) {
            const cart = await deleteProductFromCart(email, productId, theme);
            const updatedCart = await getMyCart(email);
            dispatch({ type: "REMOVE_FROM_CART", payload: updatedCart });
        }
    }
    const clearCart = async (email: string | undefined, theme: "light" | "dark" = "light", allow: boolean = true) => {
        if (email) {
            await clearCartProducts(email, theme, allow);
            const updatedCart = await getMyCart(email);
            dispatch({ type: "CLEAR_CART", payload: updatedCart });
        }
    }
    return <cartContect.Provider value={{ state, dispatch, fetchCart, addProduct, removeProduct, clearCart }}>
        {children}
    </cartContect.Provider>
};

export default Cart;

export const useCart = () => {
    const context = React.useContext(cartContect);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
