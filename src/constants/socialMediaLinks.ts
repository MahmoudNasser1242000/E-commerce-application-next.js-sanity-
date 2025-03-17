import { ISocialMediaLinks } from "@/types";
import { AtSign, Facebook, Github, Linkedin, Phone } from "lucide-react";

export const socialMedia: ISocialMediaLinks[] = [
    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mahmoud-nasser-hammad-395288228',
        icon: Linkedin
    },
    {
        title: 'Github',
        href: 'https://github.com/MahmoudNasser1242000',
        icon: Github
    },
    {
        title: 'Gmail',
        href: 'mailto:mahmoudahmed102030405060@gmail.com',
        icon: AtSign
    },
    {
        title: 'WhatsApp',
        href: 'https://wa.me/+201094170994',
        icon: Phone
    },
    {
        title: 'Messenger',
        href: 'https://m.me/mahmoudahmed.hamad.50',
        icon: Facebook
    },
]