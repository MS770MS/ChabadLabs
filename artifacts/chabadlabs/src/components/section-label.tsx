import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  label: string;
}

export function SectionLabel({ number, label, className, ...props }: SectionLabelProps) {
  const characters = Array.from(label);

  return (
    <div 
      className={cn("flex items-center gap-4 font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-8", className)}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {number}
      </motion.span>
      <motion.div 
        className="h-px bg-primary/40 max-w-[40px] shadow-[0_0_5px_var(--primary)]" 
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <span className="flex">
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, display: "none" }}
            whileInView={{ opacity: 1, display: "inline" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.1,
              delay: 0.4 + index * 0.05,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </div>
  );
}
