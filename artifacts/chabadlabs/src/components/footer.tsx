import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur border-t border-primary/20 py-12 md:py-16 mt-24 relative overflow-hidden">
      {/* Decorative futuristic scanline/gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_10px_var(--primary)]"></div>
      
      {/* Background grid for footer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_100%)] opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Resource Library</Link></li>
              <li><Link href="/webinars" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Webinar Archive</Link></li>
              <li><Link href="/get-started" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"><span className="text-primary/50 text-xs">&gt;</span> Get Started Path</Link></li>
            </ul>
          </div>

          {/* CTA Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-foreground text-sm tracking-widest uppercase">Network</h4>
            <p className="text-muted-foreground text-sm">
              Join fellow shluchim building the next generation of tools.
            </p>
            <a 
              href="https://github.com/nanoclaw/nanoclaw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 transition-colors mt-2"
            >
              <div className="w-8 h-8 rounded border border-primary/50 flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              Join the Source
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEMS ONLINE // {new Date().getFullYear()} CHABADLABS
          </p>
          <p>OPEN SOURCE // SECURE CORE</p>
        </div>
      </div>
    </footer>
  );
}
