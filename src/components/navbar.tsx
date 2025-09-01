import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthState } from "@/store/auth/authSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthActions } from "@/store/auth/authActions";

const publicRoutes = ["/"];

export const Navbar = () => {
    const { user } = useSelector(selectAuthState);
    const location = useLocation();
    const { getProfile } = useAuthActions();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!publicRoutes.includes(location.pathname)) {
            getProfile();
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        color="foreground"
                        href="/"
                    >
                        <Logo className="w-20" />
                    </Link>
                </NavbarBrand>
                <div className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <Link
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
                {user && (
                    <div className="flex items-center gap-2">
                        <NavbarItem className="hidden sm:flex gap-2">
                            Hi! {user?.firstName}
                        </NavbarItem>
                        <NavbarItem>
                            <div
                                className="cursor-pointer hover:text-primary font-semibold"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </NavbarItem>
                    </div>
                )}
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
                {user && (
                    <div className="flex items-center gap-2">
                        <NavbarItem className="hidden sm:flex gap-2">
                            Hi! {user?.firstName}
                        </NavbarItem>
                        <NavbarItem>
                            <div
                                className="cursor-pointer hover:text-primary font-semibold"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </NavbarItem>
                    </div>
                )}
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link color="primary" href={item.href} size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
