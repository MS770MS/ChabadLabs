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

          {/* Links Col */}
          <div className="footer-col flex flex-col gap-4 gsap-hidden">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Resource Library</Link></li>
              <li><Link href="/webinars" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Webinar Archive</Link></li>
              <li><Link href="/get-started" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Get Started Path</Link></li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="footer-col flex flex-col gap-4 gsap-hidden">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Support</h4>
            <p className="text-muted-foreground text-sm">
              Help keep this project running. Every contribution fuels the mission.
            </p>
            <a 
              href="https://ko-fi.com/tenpr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 transition-colors mt-2"
            >
              <div className="w-8 h-8 rounded border border-primary/50 flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              Support the Team
            </a>
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
