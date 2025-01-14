/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
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
              <ThemeSelector />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
