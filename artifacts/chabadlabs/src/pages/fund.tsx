import { useRef, useState } from "react";
import { Link } from "wouter";
import { Heart, Rocket, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/section-label";
import { useToast } from "@/hooks/use-toast";
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
];

export default function Fund() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [partnerForm, setPartnerForm] = useState({ name: "", contact: "", help: "" });
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name.trim() || !partnerForm.contact.trim()) return;
    setPartnerSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "partner-contact", data: partnerForm }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({ title: "Thanks for reaching out!", description: "We'll be in touch soon." });
      setPartnerForm({ name: "", contact: "", help: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setPartnerSubmitting(false);
    }
  };

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

          {/* Partner Contact Form */}
          <div className="fund-card glass-panel border border-border hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,154,42,0.1)]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Handshake className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono tracking-widest text-primary/70 uppercase">
                  BECOME A PARTNER
                </span>
                <p className="text-muted-foreground mt-3 text-base leading-relaxed mb-6">
                  Donors and organizations who want to accelerate AI adoption across Chabad — let's talk.
                </p>
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partner-name" className="text-sm font-medium text-foreground">Your Name</Label>
                    <Input id="partner-name" value={partnerForm.name} onChange={(e) => setPartnerForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" className="bg-card/40 border-border/60" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-contact" className="text-sm font-medium text-foreground">Email or Phone</Label>
                    <Input id="partner-contact" value={partnerForm.contact} onChange={(e) => setPartnerForm((p) => ({ ...p, contact: e.target.value }))} placeholder="email@example.com or phone number" className="bg-card/40 border-border/60" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-help" className="text-sm font-medium text-foreground">How would you like to help?</Label>
                    <Textarea id="partner-help" value={partnerForm.help} onChange={(e) => setPartnerForm((p) => ({ ...p, help: e.target.value }))} placeholder="Tell us a bit about how you'd like to get involved..." className="bg-card/40 border-border/60 min-h-[100px]" />
                  </div>
                  <Button type="submit" className="btn-futuristic gap-2" disabled={partnerSubmitting}>
                    {partnerSubmitting ? "Sending..." : "Get in Touch"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
