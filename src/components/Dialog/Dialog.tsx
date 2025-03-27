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
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useCart } from "@/context/Cart";

interface IProps {
    productId: string;
}
const DialogDelelteProduct = ({ productId }: IProps) => {
    const { user } = useUser();
    const { resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<"light" | "dark">();

    const { removeProduct } = useCart();

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    const deleteProduct = async () => {
        await removeProduct(user?.emailAddresses[0].emailAddress, productId, themes as "light" | "dark");
    }
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <div className={cn(buttonVariants({ variant: "ghost", className: "text-red-500 hover:text-red-400 cursor-pointer" }))}>
                    <Trash2 className="size-5 cursor-pointer" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you absolutely sure? This action cannot be undone. This will permanently delete the product.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div>
                        <Button type="submit" className="text-white rounded-sm cursor-pointer" onClick={() => deleteProduct()}>Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </>;
};

export default DialogDelelteProduct;
