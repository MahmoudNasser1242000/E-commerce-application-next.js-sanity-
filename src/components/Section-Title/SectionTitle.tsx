import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ISectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    desc: string;
}
const SectionTitle : FC<ISectionTitleProps> = ({title, desc, className, ...props}) => {
    return <div className={cn("flex flex-col", className)} {...props}>
        <h2 className={`text-primary font-semibold text-2xl sm:text-3xl text-center`}>{title}</h2>
        <p className={`text-[30px] text-center`}>{desc}</p>
    </div>;
};

export default SectionTitle;
