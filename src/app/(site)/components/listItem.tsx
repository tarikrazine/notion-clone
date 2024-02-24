"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "group block select-none space-y-1 font-medium leading-none",
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-white">
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-white group-hover:text-white/70">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";

export default ListItem;
