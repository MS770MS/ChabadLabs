import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Webinars", href: "/webinars" },
  { label: "Live Projects", href: "/showcase" },
  { label: "Gabai", href: "/gabai" },
  { label: "Fund", href: "/fund" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".nav-logo",
        { x: -30, opacity: 0, visibility: "hidden" },
        { x: 0, opacity: 1, visibility: "visible", duration: 0.8 }
      )
      .fromTo(".nav-cta",
        { x: 30, opacity: 0, visibility: "hidden" },
        { x: 0, opacity: 1, visibility: "visible", duration: 0.8 },
        0
      )
      .fromTo(".nav-item",
        { y: -20, opacity: 0, visibility: "hidden" },
        { y: 0, opacity: 1, visibility: "visible", stagger: 0.1, duration: 0.6 },
        0.2
      );
  }, { scope: headerRef });

  const isActive = (item: NavItem): boolean => {
    return location === item.href;
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_hsl(var(--primary)/0.1)]" : "bg-transparent py-2 border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="nav-logo flex items-center gap-1.5 group gsap-hidden">
            <span className="font-display font-bold text-xl md:text-2xl text-foreground tracking-tight">
              ChabadLabs
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary mb-1 group-hover:scale-150 transition-transform"></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-item text-sm font-medium transition-colors relative py-2 gsap-hidden",
                  location === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.label}
                {location === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="nav-cta hidden md:inline-flex gsap-hidden border-primary/30 hover:border-primary/80 hover:bg-primary/10" asChild>
              <a href="https://ko-fi.com/chabadlabs" target="_blank" rel="noopener noreferrer">
                <Heart className="w-4 h-4 mr-1.5 text-primary" />
                Support
              </a>
            </Button>

            <button
              className="nav-cta md:hidden p-2 text-foreground gsap-hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 sm:p-6 h-16 md:h-20 border-b border-border/50">
              <Link href="/" className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl text-foreground tracking-tight">ChabadLabs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary mb-1"></span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground bg-secondary/50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-3xl font-display font-bold transition-colors",
                    location === item.href ? "text-primary text-glow" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-8 w-full max-w-xs flex flex-col gap-3">
                <Button className="w-full" size="lg" variant="outline" asChild>
                  <a href="https://ko-fi.com/chabadlabs" target="_blank" rel="noopener noreferrer">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    Support the Team
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
