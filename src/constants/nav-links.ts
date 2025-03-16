import { INavLinks } from "@/types";
import { House, MessageSquareText, ShoppingBag, ShoppingCart } from "lucide-react";

export const navLinks: INavLinks[] = [
    { href: "/", label: "Home", icon: House  },
    { href: "/products", label: "Products", icon: ShoppingBag },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/contact", label: "Contact", icon: MessageSquareText },
];