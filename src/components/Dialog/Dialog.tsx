import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ICart } from "@/types";
import { deleteProductFromCart } from "@/lib/cart";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";

interface IProps {
    setCart: React.Dispatch<React.SetStateAction<ICart | null>>;
    productId: string;
}
const DialogDelelteProduct = ({setCart, productId}: IProps) => {
    const {user} = useUser();
    const { theme, resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<"light" | "dark">();

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    const deleteProduct = async () => {
        const cart = await deleteProductFromCart(user?.emailAddresses[0].emailAddress, productId, themes);
        if (cart) {
            setCart(cart)
        }
    }
    return <>
        <Dialog>
            <DialogTrigger>
                <span className={cn(buttonVariants({ variant: "ghost", className: "text-red-500 hover:text-red-400 cursor-pointer" }))}>
                    <Trash2 className="size-5 cursor-pointer" />
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you absolutely sure? This action cannot be undone. This will permanently delete the product.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" className="text-white rounded-sm cursor-pointer" onClick={() => deleteProduct()}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </>;
};

export default DialogDelelteProduct;
