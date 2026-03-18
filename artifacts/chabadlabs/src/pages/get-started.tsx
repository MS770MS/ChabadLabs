import { Link } from "wouter";
import { BookOpen, Rocket, Server, Shield, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";

export default function GetStarted() {
  const steps = [
    {
      id: 1,
      title: "Choose Your Path",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/resources">
            <div className="bg-card border border-border hover:border-primary/50 p-6 rounded-xl h-full transition-all group">
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
            <div className="bg-card border border-border hover:border-primary/50 p-6 rounded-xl h-full transition-all group">
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
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 border border-transparent hover:border-border transition-all">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Try Claude for free</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </a>
            <Link href="/webinars" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 border border-transparent hover:border-border transition-all">
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
            <Button variant="outline" asChild>
              <a href="https://www.digitalocean.com/impact/nonprofits" target="_blank" rel="noopener noreferrer">
                Get DigitalOcean Nonprofit Credits
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://nonprofit.microsoft.com" target="_blank" rel="noopener noreferrer">
                Apply for Azure Credits
              </a>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h4 className="font-display font-bold text-primary mb-2">Automated Setup Script</h4>
            <p className="text-sm text-primary/80 mb-4">
              We are finalizing a one-click setup script that configures Docker, TailScale, and basic security automatically.
            </p>
            <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
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
            <li>Use <strong>Claude Code</strong> to help navigate the repo setup and configure your environment variables</li>
            <li>Run the Docker compose up command</li>
          </ol>
          <Button asChild>
            <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
              View Nanoclaw GitHub
            </a>
          </Button>
        </div>
      )
    },
    {
      id: 5,
      title: "Join the Community",
      icon: <Users className="w-6 h-6 text-primary" />,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            You're not doing this alone. Join the chat, share your custom skills (via GitHub Gists), and help others build.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" className="shadow-[0_0_30px_rgba(196,154,42,0.2)]" asChild>
              <a href="https://github.com/nanoclaw/nanoclaw" target="_blank" rel="noopener noreferrer">
                Join the Builders Chat &rarr;
              </a>
            </Button>
            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-mono text-muted-foreground border border-border">
              Marketplace Coming Soon
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <SectionLabel number="001" label="YOUR JOURNEY STARTS HERE" />
      
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Get Started</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          From zero to your own secure AI assistant. Follow the path to transform your shlichus operations.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-[1px]"></div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 group">
                
                {/* Desktop Empty Space (Left or Right) */}
                <div className={`hidden md:block w-1/2 ${isEven ? 'order-1 text-right pr-12' : 'order-3 pl-12'}`}>
                  {/* Empty for spacing, or could put an image here if we had them */}
                </div>

                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:relative z-10 w-14 h-14 rounded-full bg-background border-4 border-card flex items-center justify-center shadow-[0_0_20px_rgba(196,154,42,0.2)] order-2 shrink-0 group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${isEven ? 'order-3 md:pl-12' : 'order-1 md:text-right md:pr-12'}`}>
                  <div className={`bg-card/50 backdrop-blur border border-border p-8 rounded-3xl group-hover:border-primary/30 transition-colors ${!isEven && 'md:items-end md:text-right'}`}>
                    <div className={`text-sm font-mono text-primary font-bold mb-2 flex items-center gap-2 ${!isEven && 'md:justify-end'}`}>
                      STEP 0{step.id}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-6 text-foreground">{step.title}</h3>
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
