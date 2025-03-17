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