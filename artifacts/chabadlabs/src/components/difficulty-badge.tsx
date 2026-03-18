import { cn } from "@/lib/utils";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface DifficultyBadgeProps {
  level: Difficulty;
  className?: string;
}

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        {
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20": level === "Beginner",
          "bg-blue-500/10 text-blue-400 border-blue-500/20": level === "Intermediate",
          "bg-purple-500/10 text-purple-400 border-purple-500/20": level === "Advanced",
        },
        className
      )}
    >
      {level}
    </span>
  );
}
