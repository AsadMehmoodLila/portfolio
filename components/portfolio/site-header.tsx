"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/theme-controls";
import { identity } from "@/data/portfolio";
import { BrandMark } from "./brand-mark";

const items = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link
          className="wordmark"
          href="/"
          prefetch={false}
          aria-label={`${identity.brand} home`}
        >
          <BrandMark />
          {identity.brand}
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {items.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link
            href="/contact/"
            prefetch={false}
            className="button button-small header-contact"
            aria-current={path === "/contact/" ? "page" : undefined}
          >
            Start a project <ArrowUpRight size={16} aria-hidden />
          </Link>
          <button
            ref={trigger}
            type="button"
            className="icon-button mobile-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? (
              <X size={22} aria-hidden />
            ) : (
              <List size={22} aria-hidden />
            )}
          </button>
        </div>
      </div>
      <nav
        className="mobile-navigation shell"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact/" prefetch={false} onClick={() => setOpen(false)}>
          Start a project <ArrowUpRight size={18} aria-hidden />
        </Link>
      </nav>
      <noscript>
        <nav
          className="nojs-navigation shell"
          aria-label="Navigation without JavaScript"
        >
          {items.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
