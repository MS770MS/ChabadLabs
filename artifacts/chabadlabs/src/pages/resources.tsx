import { useState, useRef } from "react";
import { Search, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { CategoryBadge, Category } from "@/components/category-badge";
import { DifficultyBadge, Difficulty } from "@/components/difficulty-badge";
import { motion, AnimatePresence } from "framer-motion";
import resourcesData from "@/data/resources.json";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const filters = ["All", "Cloud Credits", "AI Tools", "Getting Started", "Best Practices", "Security"];

  const filteredResources = resourcesData.filter((resource) => {
    const matchesFilter = activeFilter === "All" || resource.category === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchLower) || 
      resource.description.toLowerCase().includes(searchLower);
    
    return matchesFilter && matchesSearch;
  });

  useGSAP(() => {
    // Header reveal
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
    .fromTo(".search-filter-section",
      { opacity: 0, y: 20, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  useGSAP(() => {
    // We only want to animate cards that aren't already visible.
    // Framer motion handles exit/layout. We'll use GSAP for scroll entrance.
    const cards = gsap.utils.toArray<Element>(".resource-card:not(.animated)");
    
    if (cards.length > 0) {
      ScrollTrigger.batch(cards, {
        interval: 0.1, // time window to batch
        batchMax: 3,   // max amount per batch
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
  }, { scope: containerRef, dependencies: [filteredResources] });

  return (
    <div ref={containerRef} className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="RESOURCE LIBRARY" />
      
      <div className="mb-12">
        <h1 className="page-title text-4xl md:text-6xl font-display font-bold mb-4 gsap-hidden">Resources</h1>
        <p className="page-subtitle text-xl text-muted-foreground max-w-2xl gsap-hidden">
          A curated collection of tools, guides, and credits to accelerate your AI journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-section flex flex-col md:flex-row gap-6 mb-12 gsap-hidden">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border-2 border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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

      {/* Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-24 bg-card/50 rounded-3xl border border-border border-dashed">
          <p className="text-xl text-muted-foreground">No resources found matching your search.</p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredResources.map((resource) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={resource.id}
                className="resource-card bg-transparent border border-border rounded-2xl p-6 flex flex-col transition-all duration-300 group card-futuristic"
              >
                <div className="mb-4">
                  <CategoryBadge category={resource.category as Category} />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-1">
                  {resource.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                  <DifficultyBadge level={resource.difficulty as Difficulty} />
                  
                  <a 
                    href={resource.url} 
                    target={resource.url.startsWith('http') ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors"
                  >
                    Visit
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
