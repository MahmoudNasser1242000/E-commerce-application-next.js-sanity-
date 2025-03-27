"use client"
import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/Section-Title/SectionTitle";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "@/validation/index";
import { IFormData } from "@/types/index";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InferType } from "yup";
import { Send } from "lucide-react";
import { addToast } from "@/lib/toast";
import { useTheme } from "next-themes";

const Contact = () => {
    const { resolvedTheme } = useTheme();
    const [themes, setTheme] = useState<string>("");

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [resolvedTheme]);

    const form = useForm<InferType<typeof schema>>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "",  // Default to an empty string
            email: "",
            message: "",
        },
    })

    async function onSubmit(data: IFormData) {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: process.env.NEXT_PUBLIC_WEB3DORM_ACCESS_KEY,
                name: data.username,
                email: data.email,
                message: data.message,
            }),
        });
        const result = await response.json();
        if (result.success) {
            addToast("success", "Email has been sent successfully", themes as "light" | "dark");
        } else {
            addToast("warn", "Something went wrong!", themes as "light" | "dark");
        }
    }

    return <div className="relative flex flex-col items-center justify-center px-6 sm:px-12 pt-38" id="contact">
        <SectionTitle
            title={"Contact Us"}
            desc={"If You'v Any Comments Or Feedback"}
            className="justify-center items-center"
        />
        <div className="w-[90%] sm:w-auto mt-12">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between flex-wrap gap-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full sm:w-[49%]">
                                <FormLabel>User Name</FormLabel>
                                <FormControl className="py-5 px-4 rounded-sm">
                                    <Input placeholder={`username...`} {...field} />
                                </FormControl>
                                <FormDescription>
                                    {/* {form.formState.errors.username && <span>{form.formState.errors.username.message}</span>} */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full sm:w-[49%]">
                                <FormLabel>User Email</FormLabel>
                                <FormControl className="py-5 px-4 rounded-sm">
                                    <Input placeholder={`email...`} {...field} />
                                </FormControl>
                                <FormDescription>
                                    {/* {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>} */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Message</FormLabel>
                                <FormControl className="py-2 px-4 rounded-sm h-20">
                                    <Textarea placeholder={`Message...`} {...field} />
                                </FormControl>
                                <FormDescription>
                                    {/* {form.formState.errors.message && <span>{form.formState.errors.message.message}</span>} */}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="px-8 py-3 rounded-sm text-white cursor-pointer">
                        <span>Send</span>
                        <Send />
                    </Button>
                </form>
            </Form>
        </div>
    </div>;
};

export default Contact;