import { useState, useRef } from "react";
import { format, parseISO } from "date-fns";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { DifficultyBadge, Difficulty } from "@/components/difficulty-badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import webinarsData from "@/data/webinars.json";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Webinars() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort by newest first
  const sortedWebinars = [...webinarsData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".page-title",
      { y: 40, opacity: 0, visibility: "hidden" },
      { y: 0, opacity: 1, visibility: "visible", duration: 1, ease: "power3.out" }
    )
    .fromTo(".page-subtitle",
      { opacity: 0, y: 20, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    // Stagger cards from alternating sides
    const cards = gsap.utils.toArray(".webinar-card");
    cards.forEach((card: any, i) => {
      const isOdd = i % 2 !== 0;
      gsap.fromTo(card,
        { x: isOdd ? 50 : -50, opacity: 0, visibility: "hidden" },
        { 
          x: 0, opacity: 1, visibility: "visible", duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="WEBINAR ARCHIVE" />
      
      <div className="mb-12">
        <h1 className="page-title text-4xl md:text-6xl font-display font-bold mb-4 gsap-hidden">Webinars</h1>
        <p className="page-subtitle text-xl text-muted-foreground max-w-2xl gsap-hidden">
          Learn directly from community experts. Recorded sessions covering basics, advanced tools, and deep dives into Nanoclaw.
        </p>
      </div>

      <div className="space-y-6">
        {sortedWebinars.map((webinar) => {
          const isExpanded = expandedId === webinar.id;

          return (
            <div 
              key={webinar.id} 
              className={`webinar-card gsap-hidden bg-transparent border rounded-2xl overflow-hidden transition-all duration-300 card-futuristic ${
                isExpanded ? "border-transparent shadow-[0_0_30px_-10px_rgba(196,154,42,0.15)]" : "border-border/50"
              }`}
            >
              {/* Header / Clickable Area */}
              <div 
                className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center gap-6"
                onClick={() => setExpandedId(isExpanded ? null : webinar.id)}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-mono text-primary font-semibold">
                      {format(parseISO(webinar.date), "MMMM d, yyyy")}
                    </span>
                    <DifficultyBadge level={webinar.difficulty as Difficulty} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {webinar.title}
                  </h2>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    Presented by <span className="text-foreground font-medium">{webinar.presenter}</span>
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-4">
                  <Button variant="outline" className="hidden sm:flex border-border" asChild onClick={(e) => e.stopPropagation()}>
                    <a href={webinar.recordingUrl} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch
                    </a>
                  </Button>
                  <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border/50">
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        {webinar.summary}
                      </p>
                      
                      <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                        <h4 className="font-display font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Key Takeaways</h4>
                        <ul className="space-y-3">
                          {webinar.takeaways.map((takeaway, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        {webinar.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-background rounded-full border border-border text-xs text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Button className="w-full sm:w-auto" size="lg" asChild>
                        <a href={webinar.recordingUrl} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Watch Recording &rarr;
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
