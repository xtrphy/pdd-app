import Link from "next/link"
import { ChevronDownIcon, SlashIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { Dot } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BreadcrumbWithDropdown() {
    const pathname = usePathname()

    return (
        <Breadcrumb className="ml-3">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Главная</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Dot strokeWidth={7} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                            Аккаунт
                            <ChevronDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/login" className={`${pathname === '/login' ? 'underline' : ''}`}>Логин</Link>
                                </BreadcrumbLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/register" className={`${pathname === '/register' ? 'underline' : ''}`}>Регистрация</Link>
                                </BreadcrumbLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Dot strokeWidth={7} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>{pathname === '/login' ? 'Логин' : 'Регистрация'}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
