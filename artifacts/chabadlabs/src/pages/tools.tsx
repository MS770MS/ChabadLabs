import { useState, useRef, useMemo } from "react";
import { Link } from "wouter";
import { Search, ExternalLink, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { CategoryBadge } from "@/components/category-badge";
import { TypeBadge } from "@/components/difficulty-badge";
import { motion, AnimatePresence } from "framer-motion";
import resourcesData from "@/data/resources.json";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 30;

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showRecommendForm, setShowRecommendForm] = useState(false);
  const [recommendForm, setRecommendForm] = useState({ name: "", url: "", note: "" });
  const [recommendSubmitting, setRecommendSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const categories = useMemo(() => {
    const cats = new Set(resourcesData.map((r) => r.category));
    const sorted = ["All", ...Array.from(cats).sort()];
    // Ensure Agents category is always present
    if (!sorted.includes("Agents")) {
      sorted.push("Agents");
    }
    return sorted;
  }, []);

  const filteredResources = useMemo(() => {
    return resourcesData.filter((resource) => {
      const matchesFilter = activeFilter === "All" || resource.category === activeFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.category.toLowerCase().includes(searchLower);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const visibleResources = filteredResources.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResources.length;

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
    )
    .fromTo(".featured-section",
      { opacity: 0, y: 30, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".search-filter-section",
      { opacity: 0, y: 20, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  useGSAP(() => {
    const cards = gsap.utils.toArray<Element>(".resource-card:not(.animated)");
    if (cards.length > 0) {
      ScrollTrigger.batch(cards, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 40, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", overwrite: true, onComplete: () => {
                elements.forEach((el: any) => el.classList.add("animated"));
            }}
          );
        },
        start: "top 95%"
      });
    }
  }, { scope: containerRef, dependencies: [visibleResources] });

  const handleRecommendSubmit = async () => {
    if (!recommendForm.name.trim()) return;
    setRecommendSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "tool-recommendation", data: recommendForm }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({
        title: "Thanks for the recommendation!",
        description: `We'll review "${recommendForm.name}" and add it if it's a good fit.`,
      });
      setRecommendForm({ name: "", url: "", note: "" });
      setShowRecommendForm(false);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setRecommendSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="TOOLS" />

      <div className="mb-8">
        <h1 className="page-title text-4xl md:text-6xl font-display font-bold mb-4 gsap-hidden">Tools</h1>
        <p className="page-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl gsap-hidden">
          Curated AI tools and resources for shluchim
        </p>
      </div>

      {/* Nanoclaw Featured Section */}
      <div className="featured-section mb-10 gsap-hidden">
        <div className="card-futuristic rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary border border-primary/30 rounded-md bg-primary/10 mb-4">
                FEATURED
              </span>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">Nanoclaw</h3>
              </div>
              <p className="text-lg font-display font-semibold text-foreground/90 mb-2">Secure AI Agent Framework</p>
              <p className="text-muted-foreground max-w-xl">
                Deploy your own AI agents with enterprise-grade security. Preconfigured packages for shluchim.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 btn-futuristic relative" asChild>
                <a href="https://nanoclaw.dev/" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </a>
              </Button>
              <Button className="btn-futuristic glow-primary" asChild>
                <Link href="/gabai">
                  <span className="relative z-10">Set Up Your Own</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="search-filter-section flex flex-col gap-4 mb-10 gsap-hidden">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools, categories..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className="w-full bg-card border-2 border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setVisibleCount(PAGE_SIZE); }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-24 bg-card/50 rounded-3xl border border-border border-dashed">
          {activeFilter === "Agents" ? (
            <>
              <p className="text-xl text-muted-foreground">Agentic tools coming soon.</p>
              <p className="text-muted-foreground mt-2">Know one? Let us know.</p>
            </>
          ) : (
            <>
              <p className="text-xl text-muted-foreground">No tools found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {visibleResources.map((resource) => (
                <motion.a
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card bg-transparent border border-border rounded-2xl p-5 flex flex-col transition-all duration-300 group card-futuristic hover:border-primary/40"
                >
                  <div className="flex items-center justify-between mb-3">
                    <CategoryBadge category={resource.category} />
                    <TypeBadge type={resource.type} />
                  </div>

                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {resource.title}
                  </h3>

                  {resource.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
                      {resource.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                    {resource.mentionCount > 0 ? (
                      <span className="text-xs text-muted-foreground font-mono">
                        {resource.mentionCount} mentions
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Visit
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-8 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary/20 transition-all"
              >
                Load More ({filteredResources.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Tool Recommendation Section */}
          <div className="mt-16 text-center">
            {!showRecommendForm ? (
              <button
                onClick={() => setShowRecommendForm(true)}
                className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
              >
                Don't see a tool you'd recommend? Suggest one &rarr;
              </button>
            ) : (
              <div className="card-futuristic rounded-2xl p-6 md:p-8 max-w-lg mx-auto text-left">
                <h3 className="text-lg font-display font-bold mb-4">Recommend a Tool</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Tool name *"
                    value={recommendForm.name}
                    onChange={(e) => setRecommendForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground text-sm"
                  />
                  <input
                    type="url"
                    placeholder="URL (optional)"
                    value={recommendForm.url}
                    onChange={(e) => setRecommendForm((f) => ({ ...f, url: e.target.value }))}
                    className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground text-sm"
                  />
                  <textarea
                    placeholder="Why do you recommend it? (optional)"
                    value={recommendForm.note}
                    onChange={(e) => setRecommendForm((f) => ({ ...f, note: e.target.value }))}
                    rows={3}
                    className="w-full bg-card border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground text-sm resize-none"
                  />
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRecommendForm(false);
                        setRecommendForm({ name: "", url: "", note: "" });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn-futuristic"
                      onClick={handleRecommendSubmit}
                      disabled={recommendSubmitting || !recommendForm.name.trim()}
                    >
                      {recommendSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
