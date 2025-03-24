import { INavLinks } from "@/types";
import { House, MessageSquareText, ShoppingBag, ShoppingCart } from "lucide-react";

export const navLinks: INavLinks[] = [
    { href: "/", label: "Home", icon: House  },
    { href: "/Products?page=1", label: "Products", icon: ShoppingBag },
    { href: "/Cart", label: "Cart", icon: ShoppingCart },
    { href: "/Contact", label: "Contact", icon: MessageSquareText },
];