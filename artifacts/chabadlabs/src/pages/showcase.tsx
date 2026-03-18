import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ArrowUpCircle, ExternalLink, Trophy, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  builder: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  upvotes: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

type SortMode = "votes" | "newest";

const VOTES_KEY = "chabadlabs_project_votes";

function getStoredVotes(): Record<number, number> {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getVotedIds(): Set<number> {
  try {
    const raw = localStorage.getItem(VOTES_KEY + "_voted");
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortMode, setSortMode] = useState<SortMode>("votes");
  const [votes, setVotes] = useState<Record<number, number>>(getStoredVotes);
  const [votedIds, setVotedIds] = useState<Set<number>>(getVotedIds);
  const { toast } = useToast();

  const projects: Project[] = projectsData.map((p) => ({
    ...p,
    upvotes: p.upvotes + (votes[p.id] || 0),
  }));

  const sorted = [...projects].sort((a, b) => {
    if (sortMode === "votes") {
      if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const leaderboard = [...projects]
    .sort((a, b) => {
      if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 3);

  const handleUpvote = useCallback((id: number) => {
    if (votedIds.has(id)) return;

    const newVotes = { ...votes, [id]: (votes[id] || 0) + 1 };
    const newVotedIds = new Set(votedIds);
    newVotedIds.add(id);

    setVotes(newVotes);
    setVotedIds(newVotedIds);
    localStorage.setItem(VOTES_KEY, JSON.stringify(newVotes));
    localStorage.setItem(VOTES_KEY + "_voted", JSON.stringify([...newVotedIds]));
  }, [votes, votedIds]);

  const handleSubmitProject = () => {
    toast({
      title: "Coming Soon",
      description: "Project submissions opening soon! Join the WhatsApp community to stay updated.",
    });
  };

  // Page entrance animations
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
    .fromTo(".leaderboard-section",
      { opacity: 0, y: 30, visibility: "hidden" },
      { opacity: 1, y: 0, visibility: "visible", duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  // Card stagger animation
  useGSAP(() => {
    const cards = gsap.utils.toArray<Element>(".project-card");
    if (cards.length > 0) {
      ScrollTrigger.batch(cards, {
        interval: 0.1,
        batchMax: 3,
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 40, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
          );
        },
        once: true,
      });
    }
  }, { scope: containerRef, dependencies: [sortMode] });

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="001" label="LIVE PROJECTS" />

        <h1 className="page-title gsap-hidden text-4xl md:text-5xl font-display font-bold text-foreground mt-4">
          Live Projects
        </h1>
        <p className="page-subtitle gsap-hidden text-lg text-muted-foreground mt-3 max-w-2xl">
          See what shluchim are building with AI
        </p>

        {/* Leaderboard */}
        <div className="leaderboard-section gsap-hidden mt-12">
          <div className="glass-panel border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="font-mono text-sm font-semibold tracking-widest text-primary uppercase">
                Leaderboard
              </h2>
            </div>

            <div className="space-y-3">
              {leaderboard.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                    index === 0
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-card/40 border border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-lg font-bold ${
                      index === 0 ? "text-primary" : "text-muted-foreground"
                    }`}>
                      #{index + 1}
                    </span>
                    <div>
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {project.title}
                      </a>
                      <p className="text-sm text-muted-foreground">{project.builder}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpvote(project.id)}
                    disabled={votedIds.has(project.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                      votedIds.has(project.id)
                        ? "text-primary bg-primary/10 cursor-default"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                    }`}
                  >
                    <ArrowUpCircle className="w-4 h-4" />
                    <span className="font-mono text-sm font-semibold">{project.upvotes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 mt-10 mb-6">
          <button
            onClick={() => setSortMode("votes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider uppercase transition-all ${
              sortMode === "votes"
                ? "bg-primary/20 text-primary border border-primary/40"
                : "text-muted-foreground hover:text-foreground border border-border/50"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Most Voted
          </button>
          <button
            onClick={() => setSortMode("newest")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider uppercase transition-all ${
              sortMode === "newest"
                ? "bg-primary/20 text-primary border border-primary/40"
                : "text-muted-foreground hover:text-foreground border border-border/50"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Newest
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((project) => (
            <div
              key={project.id}
              className="project-card card-futuristic glass-panel border border-border rounded-2xl p-6 flex flex-col opacity-0"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0 ml-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.builder}</p>
                <p className="text-sm text-muted-foreground/80 line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <button
                  onClick={() => handleUpvote(project.id)}
                  disabled={votedIds.has(project.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                    votedIds.has(project.id)
                      ? "text-primary bg-primary/10 cursor-default"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4" />
                  <span className="font-mono text-sm font-semibold">{project.upvotes}</span>
                </button>

                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <Button
            onClick={handleSubmitProject}
            className="btn-futuristic px-8 py-3 font-semibold"
          >
            Submit Your Project
          </Button>
          <Link href="/showcase/apply">
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-3 font-semibold"
            >
              Apply for a Grant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
