import { Link } from "wouter";
import { BookOpen, Rocket, Server, Shield, Users, ArrowRight, CheckCircle2, Code } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GetStarted() {
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Vertical Timeline Line
    gsap.fromTo(".timeline-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: true
        }
      }
    );

    // Timeline Steps
    const steps = gsap.utils.toArray(".timeline-step");
    steps.forEach((step: any, i) => {
      const isEven = i % 2 !== 0;
      
      const node = step.querySelector(".timeline-node");
      const pulse = step.querySelector(".timeline-pulse");
      const content = step.querySelector(".timeline-content");

      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 70%",
          once: true
        }
      });

      // Node pop
      stepTl.fromTo(node,
        { scale: 0, visibility: "hidden" },
        { scale: 1, visibility: "visible", duration: 0.6, ease: "back.out(1.7)" }
      )
      // Pulse outward
      .fromTo(pulse,
        { scale: 1, opacity: 1 },
        { scale: 2.5, opacity: 0, duration: 1, ease: "power2.out" },
        "<"
      )
      // Content slide in
      .fromTo(content,
        { x: isEven ? -40 : 40, opacity: 0, visibility: "hidden" },
        { x: 0, opacity: 1, visibility: "visible", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      // Typing effect for the "STEP 0X"
      .fromTo(step.querySelectorAll(".step-char"),
        { opacity: 0, display: "none" },
        { opacity: 1, display: "inline", duration: 0.05, stagger: 0.05 },
        "-=0.6"
      );

    });

  }, { scope: containerRef });

  const steps = [
    {
      id: 1,
      title: "Choose Your Path",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/resources">
            <div className="bg-transparent border border-border/50 p-6 rounded-xl h-full transition-all group card-futuristic cursor-pointer">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">🌱</span> I'm New to AI
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Start with the basics. Learn what AI is and how it can transform your shlichus.
              </p>
              <span className="text-primary text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                Start Learning &rarr;
              </span>
            </div>
          </Link>
          <a href="#step-3">
            <div className="bg-transparent border border-border/50 p-6 rounded-xl h-full transition-all group card-futuristic cursor-pointer">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">⚡️</span> I'm Ready to Build
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Skip the intro. Set up your server and deploy your own isolated AI assistant today.
              </p>
              <span className="text-primary text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                Jump to Setup &rarr;
              </span>
            </div>
          </a>
        </div>
      )
    },
    {
      id: 2,
      title: "Learn the Basics",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">Before deploying custom tools, get comfortable with standard AI interfaces.</p>
          <div className="flex flex-col gap-3">
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/30 transition-all card-futuristic">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Try Claude for free</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </a>
            <Link href="/webinars" className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/30 transition-all card-futuristic">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Watch "AI Basics for Shluchim"</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Set Up Your Server",
      icon: <Server className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-6" id="step-3">
          <p className="text-muted-foreground">You need a home for your AI. We recommend a VPS with <strong>8GB RAM, 2 vCPUs, and Ubuntu 24.04 LTS</strong>.</p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="btn-futuristic" asChild>
              <a href="https://www.digitalocean.com/impact/nonprofits" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Get DigitalOcean Nonprofit Credits</span>
              </a>
            </Button>
            <Button variant="outline" className="btn-futuristic" asChild>
              <a href="https://nonprofit.microsoft.com" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Apply for Azure Credits</span>
              </a>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6 card-futuristic">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse"></div>
            <h4 className="font-display font-bold text-primary mb-2 flex items-center gap-2">Automated Setup Script <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span></h4>
            <p className="text-sm text-primary/80 mb-4">
              We are finalizing a one-click setup script that configures Docker, TailScale, and basic security automatically.
            </p>
            <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              Contact team for early access &rarr;
            </a>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Deploy Nanoclaw",
      icon: <Shield className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">Install the secure, Docker-sandboxed agent framework.</p>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-2">
            <li>Fork the Nanoclaw repository on GitHub</li>
            <li>Clone it to your newly provisioned VPS</li>
            <li>Use <strong className="text-primary font-mono bg-primary/10 px-1 rounded">Claude Code</strong> to help navigate the repo setup and configure your environment variables</li>
            <li>Run the <span className="font-mono text-xs bg-secondary/80 px-2 py-1 rounded border border-border">docker compose up</span> command</li>
          </ol>
          <Button className="btn-futuristic" asChild>
            <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
              <span className="relative z-10">View Nanoclaw GitHub</span>
            </a>
          </Button>
        </div>
      )
    },
    {
      id: 5,
      title: "Build & Share Skills",
      icon: <Code className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">Customize your AI assistant by giving it specialized skills tailored to your Chabad house.</p>
          <ul className="space-y-3 text-muted-foreground ml-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Write custom Python scripts for your specific workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Connect to your local CRM or database</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Share your custom skills via GitHub Gists to help other Shluchim</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      title: "Join the Community",
      icon: <Users className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            You're not doing this alone. Join the chat, share your custom skills, and help others build.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" className="btn-futuristic glow-primary shadow-[0_0_30px_rgba(196,154,42,0.2)]" asChild>
              <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10">Join the Builders Chat &rarr;</span>
              </a>
            </Button>
            <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-mono text-muted-foreground border border-border flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Marketplace Coming Soon
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="YOUR JOURNEY STARTS HERE" />
      
      <div className="mb-16">
        <h1 className="page-title text-4xl md:text-6xl font-display font-bold mb-4 gsap-hidden">Get Started</h1>
        <p className="page-subtitle text-xl text-muted-foreground max-w-2xl gsap-hidden">
          From zero to your own secure AI assistant. Follow the path to transform your shlichus operations.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative timeline-container">
        {/* Animated Vertical Flowing Line */}
        <div className="timeline-line absolute left-[27px] top-4 bottom-8 w-[2px] bg-primary/50 md:left-1/2 md:-translate-x-[1px] shadow-[0_0_10px_var(--primary)] origin-top">
          <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 animate-[scanline_3s_linear_infinite]"></div>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;
            const stepName = `STEP 0${step.id}`;
            return (
              <div key={step.id} className="timeline-step relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 group">
                
                {/* Desktop Empty Space (Left or Right) */}
                <div className={`hidden md:block w-1/2 ${isEven ? 'order-1 text-right pr-12' : 'order-3 pl-12'}`}>
                  {/* Empty for spacing */}
                </div>

                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:relative z-10 w-14 h-14 order-2 shrink-0 flex items-center justify-center">
                  <div className="timeline-pulse absolute inset-0 rounded-full border-2 border-primary/50 pointer-events-none"></div>
                  <div className="timeline-node w-14 h-14 rounded-full bg-background border-4 border-card flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(196,154,42,0.4)] group-hover:scale-110 transition-all duration-300 gsap-hidden">
                    <div className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${isEven ? 'order-3 md:pl-12' : 'order-1 md:text-right md:pr-12'}`}>
                  <div className={`timeline-content bg-transparent backdrop-blur-sm border border-border/50 p-8 rounded-3xl transition-all duration-300 card-futuristic gsap-hidden ${!isEven && 'md:items-end md:text-right'}`}>
                    <div className={`text-sm font-mono text-primary font-bold mb-2 flex items-center gap-2 ${!isEven && 'md:justify-end'}`}>
                      <span className="opacity-70 animate-pulse">&gt;_</span>
                      <span>
                        {stepName.split("").map((c, idx) => (
                          <span key={idx} className="step-char gsap-hidden">{c === " " ? "\u00A0" : c}</span>
                        ))}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-6 text-foreground group-hover:text-primary transition-colors">{step.title}</h3>
                    <div className={`text-left ${!isEven && 'md:flex md:flex-col md:items-end'}`}>
                      {step.content}
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
