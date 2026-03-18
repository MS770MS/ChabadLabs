import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-mono text-primary text-sm font-bold tracking-widest mb-4">404 ERROR</div>
      <h1 className="text-6xl md:text-8xl font-display font-black mb-6 text-glow">Lost in Space</h1>
      <p className="text-xl text-muted-foreground max-w-lg mb-10">
        The page you are looking for has drifted into the void. Let's get you back to command center.
      </p>
      <Button size="lg" asChild>
        <Link href="/">Return to Base</Link>
      </Button>
    </div>
  );
}
