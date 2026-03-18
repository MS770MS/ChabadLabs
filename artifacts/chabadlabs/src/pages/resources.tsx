import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { CategoryBadge, Category } from "@/components/category-badge";
import { DifficultyBadge, Difficulty } from "@/components/difficulty-badge";
import { motion, AnimatePresence } from "framer-motion";
import resourcesData from "@/data/resources.json";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Cloud Credits", "AI Tools", "Getting Started", "Best Practices", "Security"];

  const filteredResources = resourcesData.filter((resource) => {
    const matchesFilter = activeFilter === "All" || resource.category === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchLower) || 
      resource.description.toLowerCase().includes(searchLower);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="RESOURCE LIBRARY" />
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A curated collection of tools, guides, and credits to accelerate your AI journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
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
                className="bg-transparent border border-border rounded-2xl p-6 flex flex-col transition-all duration-300 group card-futuristic"
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
