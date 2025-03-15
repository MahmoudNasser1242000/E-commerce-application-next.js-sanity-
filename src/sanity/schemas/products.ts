import { defineField, defineType } from "sanity";

export default defineType({
    name: "products",
    type: "document",
    title: "products",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "title",
            validation: (Rule) => [
                Rule.required(),
                Rule.min(2).error("title must be at least 100 char"),
                Rule.max(100).error("title must be at most 100 char"),
            ],
        }),

        defineField({
            name: "description",
            type: "string",
            title: "description",
            validation: (Rule) => [
                Rule.required(),
                Rule.min(10).error("label must be at least 20 char"),
                Rule.max(1000).error("label must be at most 1000 char"),
            ],
        }),


        defineField({
            name: "image",
            type: "image",
            title: "image",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "instantDelivery",
            type: "boolean",
            title: "instantDelivery",
            validation: (Rule) => Rule.required(),
            initialValue: true
        }),

        defineField({
            name: "price",
            type: "number",
            title: "price",
            description: "Enter a decimal price (e.g., 19.99)",
            validation: (Rule) => Rule.precision(2).min(0),
            initialValue: 1
        }),

        defineField({
            name: "category",
            type: "string",
            title: "category",
            options: {
                list: [
                    { title: "Tv", value: "tv" },
                    { title: "Phones", value: "phones" },
                    { title: "Laptops", value: "Laptops" },
                    { title: "Furniture", value: "furniture" },
                    { title: "Cosmetics", value: "cosmetics" },
                    { title: "Toys", value: "toys" },
                    { title: "Clothes", value: "clothes" },
                    { title: "Electronics", value: "electronics" },
                    { title: "Perfumes", value: "perfumes" },
                    { title: "School Supplies", value: "school supplies" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
