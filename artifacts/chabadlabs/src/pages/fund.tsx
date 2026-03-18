import { useRef } from "react";
import { Link } from "wouter";
import { Heart, Rocket, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    icon: Heart,
    label: "SUPPORT THE TEAM",
    title: "Tip the Team",
    description:
      "ChabadLabs is built by volunteers. Your tips keep the servers running and the tools free.",
    cta: "Tip the Team",
    href: "https://ko-fi.com/chabadlabs",
    external: true,
  },
  {
    icon: Rocket,
    label: "GRANTS FOR BUILDERS",
    title: "Apply for a Grant",
    description:
      "We fund shluchim who build. If you have a working project or a solid idea, apply for a grant.",
    cta: "Apply for a Grant",
    href: "/showcase/apply",
    external: false,
  },
  {
    icon: Handshake,
    label: "BECOME A PARTNER",
    title: "Get in Touch",
    description:
      "Donors and organizations who want to accelerate AI adoption across Chabad — let's talk.",
    cta: "Get in Touch",
    href: "mailto:mendy@jewishsandton.com",
    external: true,
  },
];

export default function Fund() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".page-title",
        { y: 40, opacity: 0, visibility: "hidden" },
        { y: 0, opacity: 1, visibility: "visible", duration: 1, ease: "power3.out" }
      );

      gsap.utils.toArray<HTMLElement>(".fund-card").forEach((card, i) => {
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
        {/* Header */}
        <div className="page-title gsap-hidden text-center mb-16">
          <SectionLabel number="001" label="FUND THE FUTURE" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-6">
            Fund
          </h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
            Support AI innovation in Chabad
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.label}
                className="fund-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)]"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-mono tracking-widest text-primary/70 uppercase">
                      {section.label}
                    </span>
                    <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                      {section.description}
                    </p>
                    <div className="mt-6">
                      {section.external ? (
                        <a href={section.href} target="_blank" rel="noopener noreferrer">
                          <Button className="btn-futuristic gap-2">
                            {section.cta}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </a>
                      ) : (
                        <Link href={section.href}>
                          <Button className="btn-futuristic gap-2">
                            {section.cta}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
