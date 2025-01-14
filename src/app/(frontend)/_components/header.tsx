/* eslint-disable @next/next/no-img-element */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { ThemeSelector } from "@/components/ui/theme-selector";

const Header: React.FC = () => {
  return (
    <header className="bg-stone-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link prefetch={false} href="/">
          <img src="./logo.webp" alt="Company logo" className="max-w-24" />
        </Link>
        <nav>
          <ul className="flex flex-row items-center space-x-4">
            <li>
              <Link prefetch={false} href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/account" className="hover:underline">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </li>
            <li>
              <ThemeSelector />
            </li>
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ShoppingCart />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">CART GOES HERE</div>
                </SheetContent>
              </Sheet>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
