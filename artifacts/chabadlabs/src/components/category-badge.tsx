import { cn } from "@/lib/utils";

export type Category =
  | "AI Assistants"
  | "Research & Search"
  | "Design & Media"
  | "Audio & Transcription"
  | "Coding & Apps"
  | "Productivity"
  | "Jewish & Shlichus"
  | "General"
  | "Video & Media";

interface CategoryBadgeProps {
  category: Category | string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  "AI Assistants": "text-blue-400",
  "Research & Search": "text-cyan-400",
  "Design & Media": "text-pink-400",
  "Audio & Transcription": "text-orange-400",
  "Coding & Apps": "text-emerald-400",
  "Productivity": "text-yellow-400",
  "Jewish & Shlichus": "text-primary",
  "General": "text-slate-400",
  "Video & Media": "text-purple-400",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-bold uppercase tracking-wider",
        categoryColors[category] || "text-muted-foreground",
        className
      )}
    >
      {category}
    </span>
  );
}
