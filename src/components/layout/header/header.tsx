import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { Separator } from "@/components/ui/separator";
import { ThemeSelector } from "@/components/ui/theme-selector";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CmsNavigation } from "./cms-navigation";

export const Header = () => {
  return (
    <header className="bg-stone-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link prefetch={false} href="/">
          <Image
            src="/logo.webp"
            alt="Company logo"
            className="max-w-24"
            width={200}
            height={50}
          />
        </Link>
        <nav className="flex items-center h-5 space-x-4">
          <Suspense
            fallback={<LoadingIndicator backdrop={false} size="16px" />}
          >
            <CmsNavigation />
          </Suspense>
          <Separator
            orientation="vertical"
            decorative
            className="bg-gray-500"
          />

          {/* static navigation */}
          <Link prefetch={false} href="/" className="hover:underline">
            Home
          </Link>
          <Link prefetch={false} href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link prefetch={false} href="/about" className="hover:underline">
            About
          </Link>
          <Link prefetch={false} href="/login" className="hover:underline">
            Login
          </Link>

          {/* avatar */}
          <Link prefetch={false} href="/account" className="hover:underline">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          {/* theme */}
          <ThemeSelector />

          {/* cart toggle */}
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
        </nav>
      </div>
    </header>
  );
};
