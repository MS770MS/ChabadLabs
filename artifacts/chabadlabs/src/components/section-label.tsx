import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  label: string;
}

export function SectionLabel({ number, label, className, ...props }: SectionLabelProps) {
  return (
    <div 
      className={cn("flex items-center gap-4 font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-8", className)}
      {...props}
    >
      <span>{number}</span>
      <div className="h-px flex-1 bg-primary/20 max-w-[40px]" />
      <span>{label}</span>
    </div>
  );
}
