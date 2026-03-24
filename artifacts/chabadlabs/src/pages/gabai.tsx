import { useRef } from "react";
import { Shield, Code, Users, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gabai() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".page-title",
        { y: 40, opacity: 0, visibility: "hidden" },
        { y: 0, opacity: 1, visibility: "visible", duration: 1, ease: "power3.out" }
      ).fromTo(
        ".page-subtitle",
        { opacity: 0, y: 20, visibility: "hidden" },
        { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      gsap.utils.toArray<HTMLElement>(".gabai-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section 1: Hero/Header */}
        <div className="page-title gsap-hidden text-center mb-16">
          <SectionLabel number="001" label="YOUR AI ASSISTANT" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-6">
            Gabai
          </h1>
          <p className="page-subtitle text-muted-foreground mt-3 text-lg max-w-xl mx-auto gsap-hidden">
            Your personal AI assistant, built on{" "}
            <a
              href="https://nanoclaw.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Nanoclaw
            </a>
            , customized for Shluchim. Secure, sandboxed, and ready to deploy.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {/* Section 2: What is Gabai? */}
          <div className="gabai-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)] card-futuristic relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary border border-primary/30 rounded-md bg-primary/10 mb-3">
                    FEATURED
                  </span>
                  <h2 className="text-2xl font-display font-bold mb-3">What is Gabai?</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Gabai is{" "}
                    <a
                      href="https://nanoclaw.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Nanoclaw
                    </a>{" "}
                    — the secure, Docker-sandboxed AI agent framework — customized specifically
                    for Shluchim. Each conversation runs in its own isolated container, keeping
                    your data private and your system safe.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="outline" className="btn-futuristic border-primary/50 text-primary hover:bg-primary/10" asChild>
                      <a href="https://nanoclaw.dev/" target="_blank" rel="noopener noreferrer">
                        <span className="relative z-10 flex items-center gap-2">
                          Visit Nanoclaw
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </a>
                    </Button>
                    <Button className="btn-futuristic glow-primary" asChild>
                      <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
                        <span className="relative z-10 flex items-center gap-2">
                          GitHub Repo
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Deploy Your Own */}
          <div className="gabai-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono tracking-widest text-primary/70 uppercase">
                  DEPLOY YOUR OWN
                </span>
                <h2 className="text-2xl font-display font-bold mt-2 mb-4">Set Up Gabai on Your Server</h2>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-base leading-relaxed ml-1">
                  <li>Fork the Nanoclaw repository on GitHub</li>
                  <li>
                    Clone it to your VPS —{" "}
                    <strong className="text-foreground">8GB RAM, 2 vCPUs, Ubuntu</strong> recommended
                  </li>
                  <li>Configure your environment variables</li>
                  <li>
                    Run{" "}
                    <code className="font-mono text-xs bg-secondary/80 px-2 py-1 rounded border border-border">
                      docker compose up
                    </code>
                  </li>
                </ol>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="outline" className="btn-futuristic border-primary/50 text-primary hover:bg-primary/10" asChild>
                    <a href="https://www.digitalocean.com/impact/nonprofits" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center gap-2">
                        DigitalOcean Nonprofit Credits
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  </Button>
                  <Button variant="outline" className="btn-futuristic border-primary/50 text-primary hover:bg-primary/10" asChild>
                    <a href="https://nonprofit.microsoft.com" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center gap-2">
                        Azure Nonprofit Credits
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Build & Share Skills */}
          <div className="gabai-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono tracking-widest text-primary/70 uppercase">
                  CUSTOMIZE
                </span>
                <h2 className="text-2xl font-display font-bold mt-2 mb-4">Build & Share Skills</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  Customize your Gabai with specialized skills for your Chabad house.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Write custom Python scripts for your specific workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Connect to your CRM or database</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Share skills via GitHub Gists to help other Shluchim</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Join the Community */}
          <div className="gabai-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono tracking-widest text-primary/70 uppercase">
                  COMMUNITY
                </span>
                <h2 className="text-2xl font-display font-bold mt-2 mb-4">Join the Community</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  You're not doing this alone. Join the chat, share your custom skills, and help
                  others build.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="lg" className="btn-futuristic glow-primary shadow-[0_0_30px_rgba(196,154,42,0.2)]" asChild>
                    <a
                      href="https://chat.whatsapp.com/G1s5OjSGgkc3gOfOIdRh21"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Join the Builders Chat
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>
                  </Button>
                  <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-mono text-muted-foreground border border-border flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    Skills Marketplace Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
