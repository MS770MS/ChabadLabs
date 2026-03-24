import { Link } from "wouter";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        once: true
      }
    });

    tl.fromTo(".footer-line", 
        { scaleX: 0 }, 
        { scaleX: 1, transformOrigin: "left center", duration: 1, ease: "power3.inOut" }
      )
      .fromTo(".footer-col",
        { y: 40, opacity: 0, visibility: "hidden" },
        { y: 0, opacity: 1, visibility: "visible", stagger: 0.15, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".footer-bottom",
        { opacity: 0, visibility: "hidden" },
        { opacity: 1, visibility: "visible", duration: 0.6 },
        "-=0.4"
      )
      .fromTo(".systems-online",
        { opacity: 0 },
        { opacity: 1, duration: 0.1, repeat: 3, yoyo: true, ease: "steps(1)" }
      );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-card/50 backdrop-blur border-t border-primary/20 py-12 md:py-16 mt-24 relative overflow-hidden">
      {/* Decorative futuristic scanline/gradient */}
      <div className="footer-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_10px_var(--primary)]"></div>
      
      {/* Background grid for footer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_100%)] opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Col */}
          <div className="footer-col flex flex-col gap-4 gsap-hidden">
            <Link href="/" className="flex items-center gap-1.5 inline-block group">
              <span className="font-display font-bold text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors text-glow">ChabadLabs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mb-1 animate-pulse shadow-[0_0_5px_var(--primary)]"></span>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
              AI for Shluchim. Secure, open-source, and built for the future of your shlichus.
            </p>
            <div className="flex gap-2 mt-2">
              <div className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/30 bg-primary/10 text-primary">SECURE</div>
              <div className="px-2 py-0.5 rounded text-[10px] font-mono border border-primary/30 bg-primary/10 text-primary">SANDBOXED</div>
            </div>
          </div>

          {/* Navigate Col */}
          <div className="footer-col flex flex-col gap-4 gsap-hidden">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Tools</Link></li>
              <li><Link href="/webinars" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Webinars</Link></li>
              <li><Link href="/showcase" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Live Projects</Link></li>
              <li><Link href="/gabai" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Gabai</Link></li>
            </ul>
          </div>

          {/* Community Col */}
          <div className="footer-col flex flex-col gap-4 gsap-hidden">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Community</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://chat.whatsapp.com/G1s5OjSGgkc3gOfOIdRh21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> WhatsApp Group</a></li>
              <li><Link href="/showcase" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Submit a Project</Link></li>
              <li><Link href="/showcase/apply" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Apply for a Grant</Link></li>
              <li><Link href="/fund" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Fund</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono gsap-hidden">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="systems-online">SYSTEMS ONLINE</span> // {new Date().getFullYear()} CHABADLABS
          </p>
          <p>OPEN SOURCE // SECURE CORE</p>
        </div>
      </div>
    </footer>
  );
}
