import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-mono text-primary text-sm font-bold tracking-widest mb-4">404 ERROR</div>
      <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-6 text-glow">Lost in Space</h1>
      <p className="text-xl text-muted-foreground max-w-lg mb-8">
        The page you are looking for has drifted into the void. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Button size="lg" asChild>
          <Link href="/">Return to Base</Link>
        </Button>
      </div>
      <div className="glass-panel border border-primary/20 rounded-xl px-8 py-6 max-w-md">
        <p className="text-sm text-muted-foreground font-mono tracking-wider mb-4">TRY THESE INSTEAD</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/tools" className="text-sm text-primary hover:text-primary/80 transition-colors border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/10">
            Tools
          </Link>
          <Link href="/showcase" className="text-sm text-primary hover:text-primary/80 transition-colors border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/10">
            Live Projects
          </Link>
          <Link href="/get-started" className="text-sm text-primary hover:text-primary/80 transition-colors border border-primary/30 rounded-full px-4 py-1.5 hover:bg-primary/10">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
