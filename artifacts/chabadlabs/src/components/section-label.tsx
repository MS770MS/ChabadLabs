import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  label: string;
}

export function SectionLabel({ number, label, className, ...props }: SectionLabelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const characters = Array.from(label);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      }
    });

    tl.fromTo(".label-number", 
        { x: -20, opacity: 0, visibility: "hidden" },
        { x: 0, opacity: 1, visibility: "visible", duration: 0.6, ease: "power3.out" }
      )
      .fromTo(".label-line", 
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power3.inOut" }, 
        "-=0.4"
      )
      .fromTo(".label-char", 
        { opacity: 0, x: 10, visibility: "hidden" },
        {
          opacity: 1,
          x: 0,
          visibility: "visible",
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out"
        }, 
        "-=0.6"
      );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={cn("flex items-center gap-4 font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-8", className)}
      {...props}
    >
      <span className="label-number gsap-hidden">
        {number}
      </span>
      <div className="label-line h-px bg-primary/40 w-10 shadow-[0_0_5px_var(--primary)]" />
      <span className="flex">
        {characters.map((char, index) => (
          <span key={index} className="label-char gsap-hidden">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}
