"use client"
import React from "react";
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

const Contact = () => {
    const form = useForm<InferType<typeof schema>>({
        resolver: yupResolver(schema),
    })

    function onSubmit(data: IFormData) {
        
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
                                <FormControl>
                                    <Input placeholder={`username...`} {...field} className="py-5 px-4 rounded-sm" />
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
                                <FormControl>
                                    <Input placeholder={`email...`} {...field} className="py-5 px-4 rounded-sm" />
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
                                <FormControl>
                                    <Textarea placeholder={`Message...`} {...field} className="py-2 px-4 rounded-sm h-20" />
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