"use client";

import { usePathname, useRouter } from "next/navigation";
import NavButton from "./nav-button";
import {useMedia, useSetState} from "react-use"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transictions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
]


const Navigation = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const isMobile = useMedia("(max-width: 1024px)", false)

    const onClick = (href: string)=>{
        router.push(href)
        setIsOpen(false)
    }
    if(isMobile){
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button className="focus-visible:ring-offset-0 focus-visible:ring-transparent font-normal bg-white/10 hover:bg-white/20  hover:text-white border-none outline-none focus:bg-white/30 transition text-white">
                        <Menu className="size-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="px-2">
                    <nav className="flex flex-col space-y-2 pt-6 w-full justify-start">
                        {routes.map((route) => (
                            <Button key={route.href} onClick={() => onClick(route.href)} variant={route.href === pathName ? "outline" : "ghost"}>
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton 
                    key={route.href}
                    label={route.label}
                    href={route.href}
                    isActive={pathName === route.href}
                />
            ))}
        </nav>
    )
}

export default Navigation