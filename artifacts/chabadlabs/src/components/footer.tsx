import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16 mt-24 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1.5 inline-block">
              <span className="font-display font-bold text-2xl text-foreground tracking-tight">ChabadLabs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mb-1"></span>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              AI for Shluchim. Secure, open-source, and built for the future of your shlichus.
            </p>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resource Library</Link></li>
              <li><Link href="/webinars" className="text-muted-foreground hover:text-primary transition-colors">Webinar Archive</Link></li>
              <li><Link href="/get-started" className="text-muted-foreground hover:text-primary transition-colors">Get Started Path</Link></li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground">Community</h4>
            <p className="text-muted-foreground text-sm">
              Join fellow shluchim building the next generation of tools.
            </p>
            <a 
              href="https://github.com/nanoclaw/nanoclaw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors"
            >
              Join the Chat &rarr;
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 ChabadLabs.ai</p>
          <p>Open Source · Built with ❤️ for Shluchim</p>
        </div>
      </div>
    </footer>
  );
}
