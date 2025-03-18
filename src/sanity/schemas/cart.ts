import { defineField, defineType } from "sanity";

export default defineType({
    name: "cart",
    type: "document",
    title: "cart",
    fields: [
        defineField({
            name: "username",
            type: "string",
            title: "user name",
            validation: (Rule) => [
                Rule.required(),
                Rule.min(2).error("title must be at least 100 char"),
                Rule.max(100).error("title must be at most 100 char"),
            ],
        }),

        defineField({
            name: "email",
            type: "string",
            title: "user email",
            validation: (Rule) => [
                Rule.required(),
                Rule.min(10).error("label must be at least 10 char"),
                Rule.max(1000).error("label must be at most 1000 char"),
                Rule.email().error("Please enter a valid email address"),
            ],
        }),


        defineField({
            name: "products",
            type: "array",
            title: "Products",
            of: [{ type: "reference", to: [{ type: "products" }] }],
            validation: (Rule) => Rule.required(),
        }),
    ],
});
