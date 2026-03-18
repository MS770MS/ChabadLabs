import { useRef } from "react";
import { Blocks, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SkillsComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".page-title",
        { y: 40, opacity: 0, visibility: "hidden" },
        { y: 0, opacity: 1, visibility: "visible", duration: 1, ease: "power3.out" }
      ).fromTo(
        ".coming-soon-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="page-title gsap-hidden text-center mb-16">
          <SectionLabel number="001" label="SKILLS MARKETPLACE" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-6">
            Skills Marketplace
          </h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
            Browse, install, and share community-built AI skills
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="coming-soon-card glass-panel border border-border rounded-2xl p-10 md:p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <Blocks className="w-8 h-8" />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/15 text-primary text-sm font-semibold tracking-wide border border-primary/30 mb-6">
            Coming Soon
          </span>

          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            We're building a marketplace where shluchim can share and install AI skills
            — Claude Code skills, agent configurations, and automation recipes.
          </p>

          <div className="mt-8">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Button className="btn-futuristic gap-2">
                Join the Community
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <p className="text-muted-foreground/60 text-sm mt-3">
              to be the first to know.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
