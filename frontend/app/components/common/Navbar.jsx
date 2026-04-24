"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/app/components/ui/resizable-navbar";
import { useState } from "react";
import Link from 'next/link'
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
import { cn } from "@/lib/utils";

function NavbarMain() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Pricing",
      link: "/membership",
    },
    {
      name: "Agents",
      link: "/agents",
    }
  ];
  const isLight = 'light';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUserStore();

  return (
    <div className="w-full fixed top-0 left-0 z-50 py-2">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Link href="/contact-us">
              <NavbarButton variant="secondary">contact us</NavbarButton>
            </Link>
          {
              user ? (
                <div className="relative group">
                  <button
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-medium",
                      isLight ? "bg-slate-900" : "bg-gradient-to-br from-purple-500 to-blue-500"
                    )}
                    aria-haspopup="true"
                    aria-expanded={false}
                  >
                    {user?.email ? user.email.split("@")[0].slice(0, 2).toUpperCase() : "?"}
                  </button>

                  <div className={cn(
                    "absolute right-0 mt-2 w-40 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all duration-150 z-50 border",
                    isLight ? "bg-white border-neutral-200" : "bg-slate-800 border-slate-700"
                  )}>
                    <Link href={`/my-account/dashboard/me`} className={cn("block px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Profile</Link>
                    <Link href={`/my-account/dashboard/me`} className={cn("block px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Orders</Link>
                    <button onClick={async () => { await logout(); }} className={cn("w-full text-left px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Logout</button>
                  </div>
                </div>
              ) : (
                <AnimatedSignupButton />
              )
              }
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>
              <AnimatedSignupButton />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}

export default NavbarMain;

const AnimatedSignupButton = () => {
  return (
    <Link href="/signup">
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* animated glow ring */}
        <motion.div
          className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
          animate={{
            background: [
              'linear-gradient(90deg, #60a5fa, #818cf8, #38bdf8)',
              'linear-gradient(180deg, #38bdf8, #60a5fa, #818cf8)',
              'linear-gradient(270deg, #818cf8, #38bdf8, #60a5fa)',
              'linear-gradient(360deg, #60a5fa, #818cf8, #38bdf8)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* shimmer sweep */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
        </div>

        <Button
          size="sm"
          className="relative bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white pl-5 pr-4 py-5 text-[14px] font-semibold rounded-full shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300"
        >
          Sign Up
          <motion.span
            className="inline-flex ml-1.5"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </Button>
      </motion.div>
    </Link>
  );
};