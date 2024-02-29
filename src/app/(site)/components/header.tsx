"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import ListItem from "./listItem";

import { cn } from "@/lib/utils";

import Logo from "../../../../public/cypresslogo.svg";
import { Button } from "@/components/ui/button";
import { AuthUser } from "@supabase/supabase-js";

const routes = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Resources",
    href: "#resources",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

interface HeaderProps {
  user: AuthUser | null;
}

function Header(props: HeaderProps) {
  const [path, setPath] = useState("");

  return (
    <header className="flex items-center justify-center p-4">
      <Link href="/" className="flex w-full items-center space-x-2">
        <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
        <span className="font-semibold dark:text-white">Cypress.</span>
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="space-x-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn({
                "font-bold dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "#resources",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    Welcome
                  </span>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  how to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraph, lists ...etc.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#pricing")}
              className={cn({
                "font-bold dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:grid-rows-2">
                <ListItem title="Pro Plan" href="#">
                  Unlock full power with collaboration.
                </ListItem>
                <ListItem title="Free Plan" href="#">
                  Great for teams just starting out.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn({
                "font-bold dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map(({ title, href, description }) => (
                  <ListItem key={title} title={title} href={href}>
                    {description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                "dark:text-white": path === "#testimonials",
                "dark:text-white/40": path !== "#testimonials",
                "font-normal": true,
                "text-xl": true,
              })}
            >
              Testimonials
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex w-full justify-end gap-2">
        {props.user ? (
          <Link href="/dashboard">
            <Button variant={"btn-primary"} className="whitespace-nowrap">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant={"btn-secondary"} className="hidden  p-1 sm:flex">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant={"btn-primary"} className="whitespace-nowrap">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </aside>
    </header>
  );
}

export default Header;
