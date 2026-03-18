import { Link } from "wouter";
import { BookOpen, PlayCircle, MessageSquare, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  return (
    <div className="flex flex-col relative">
      {/* Subtle Horizontal Scanline for Hero */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-primary/20 shadow-[0_0_10px_var(--primary)] z-50 pointer-events-none animate-[scanline_8s_linear_infinite]" />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

        {/* Orbiting Ring Portal Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full opacity-50 pointer-events-none animate-[orbital_20s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/30 rounded-full opacity-30 pointer-events-none animate-[orbital_15s_linear_infinite_reverse]" style={{ borderStyle: 'dotted' }}></div>

        {/* Floating Particles */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.2, 0.8, 0.2] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0], opacity: [0.1, 0.6, 0.1] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
          className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/80 shadow-[0_0_10px_var(--primary)] pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
          className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--primary)] pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 25, 0], x: [0, 20, 0], opacity: [0.2, 0.7, 0.2] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
          className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_var(--primary)] pointer-events-none" 
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold tracking-widest mb-6 animate-glow-pulse">
              CHABADLABS.AI
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[80px] leading-[1.1] font-display font-black text-foreground mb-6"
          >
            Welcome to the <br className="hidden sm:block" />
            <span className="text-glow text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-100 to-primary animate-shimmer relative inline-block">
              future of shlichus
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Your AI-powered command center. Tools, resources, and a community of builders — transforming shlichus with cutting-edge technology.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg group btn-futuristic glow-primary" asChild>
              <Link href="/resources">
                <span className="relative z-10 flex items-center">
                  Explore Resources
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg border-primary/30 hover:border-primary/80 text-foreground group relative overflow-hidden" asChild>
              <Link href="/get-started">
                <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                <span className="relative z-10">Get Started</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-mono"
          >
            <span>Open source</span>
            <span className="w-1 h-1 rounded-full bg-primary/50 animate-pulse"></span>
            <span>Community driven</span>
            <span className="w-1 h-1 rounded-full bg-primary/50 animate-pulse"></span>
            <span>Security first</span>
          </motion.div>
        </div>
      </section>

      {/* Futuristic Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent relative opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-primary blur-sm"></div>
      </div>

      {/* Bento Grid Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionLabel number="001" label="WHAT WE OFFER" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Card 1: Resources (Large) */}
          <Link href="/resources" className="block md:col-span-2 md:row-span-2 group card-futuristic">
            <div className="h-full bg-transparent p-8 md:p-12 relative flex flex-col justify-end min-h-[300px]">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity animate-float">
                <BookOpen className="w-48 h-48 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-end">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">Curated Resource Library</h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                  Everything you need to master AI for your Chabad house. Cloud credits, prompt templates, and security guides.
                </p>
                <div className="text-primary font-bold flex items-center gap-2">
                  Browse Resources <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Webinars */}
          <Link href="/webinars" className="block md:col-span-1 group card-futuristic">
            <div className="h-full bg-transparent p-8 relative flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Webinar Archive</h3>
              <p className="text-muted-foreground mb-6">
                Catch up on past community sessions and live demos.
              </p>
              <div className="text-primary font-medium flex items-center gap-2 mt-auto">
                View Webinars <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 3: AI Assistant */}
          <div className="block md:col-span-1 group card-futuristic">
            <div className="h-full bg-transparent p-8 relative flex flex-col">
              <div className="absolute top-6 right-6">
                <span className="px-2 py-1 text-[10px] font-bold tracking-wider text-primary border border-primary/30 rounded-md bg-primary/10 animate-pulse">
                  COMING SOON
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-foreground/70">AI Assistant</h3>
              <p className="text-muted-foreground mb-0">
                A purpose-built assistant to help you navigate the platform and answer questions.
              </p>
            </div>
          </div>

          {/* Card 4: Nanoclaw */}
          <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer" className="block md:col-span-3 group card-futuristic">
            <div className="bg-transparent p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3">Built on Nanoclaw — Security First</h3>
                <p className="text-muted-foreground text-lg max-w-3xl">
                  Traditional monolithic AI agents risk prompt injection and data leaks. We use Docker-based isolation to ensure every chat runs in its own secure sandbox.
                </p>
              </div>
              <div className="shrink-0">
                <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto btn-futuristic relative">
                  <span className="relative z-10 flex items-center">
                    Learn More about Nanoclaw
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </a>

        </div>
      </section>

      {/* Futuristic Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent relative opacity-50"></div>

      {/* Stats Row */}
      <section className="py-24 bg-card/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel number="002" label="THE NETWORK" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
            <div className="flex flex-col items-center text-center pt-8 md:pt-0 group relative">
              <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl md:text-5xl font-display font-black text-primary mb-2 text-glow relative z-10">
                <AnimatedCounter value={12} />+
              </span>
              <span className="text-muted-foreground font-medium relative z-10">Curated Resources</span>
            </div>
            <div className="flex flex-col items-center text-center pt-8 md:pt-0 group relative">
              <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl md:text-5xl font-display font-black text-primary mb-2 text-glow relative z-10">
                <AnimatedCounter value={3} />+
              </span>
              <span className="text-muted-foreground font-medium relative z-10">Community Webinars</span>
            </div>
            <div className="flex flex-col items-center text-center pt-8 md:pt-0 group relative">
              <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl md:text-5xl font-display font-black text-primary mb-2 text-glow relative z-10">
                <AnimatedCounter value={157} />
              </span>
              <span className="text-muted-foreground font-medium relative z-10">Active Containers</span>
            </div>
            <div className="flex flex-col items-center text-center pt-8 md:pt-0 group relative">
              <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl md:text-5xl font-display font-black text-primary mb-2 text-glow relative z-10">Open</span>
              <span className="text-muted-foreground font-medium relative z-10">Source & Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Section Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent relative opacity-50"></div>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <SectionLabel number="003" label="JOIN US" className="justify-center" />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Built by shluchim,<br/>for shluchim.</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The power of AI isn't just in the models, it's in how we build together. Join the developers chat and shape the future.
          </p>
          <Button size="lg" className="h-14 px-10 text-lg btn-futuristic glow-primary" asChild>
            <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
              <span className="relative z-10">Join the Community</span>
            </a>
          </Button>
        </div>
      </section>

    </div>
  );
}

