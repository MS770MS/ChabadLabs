import { cn } from "@/lib/utils";

export type ResourceType = "Tool" | "Model" | "Platform" | "Resource";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface TypeBadgeProps {
  type: ResourceType | string;
  className?: string;
}

const typeColors: Record<string, string> = {
  "Tool": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Model": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Platform": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Resource": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Beginner": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Intermediate": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Advanced": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        typeColors[type] || "bg-secondary text-muted-foreground border-border",
        className
      )}
    >
      {type}
    </span>
  );
}

export function DifficultyBadge({ level, className }: { level: Difficulty | string; className?: string }) {
  return <TypeBadge type={level} className={className} />;
}
