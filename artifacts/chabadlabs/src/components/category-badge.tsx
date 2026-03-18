import { cn } from "@/lib/utils";

export type Category = "Cloud Credits" | "AI Tools" | "Getting Started" | "Best Practices" | "Security";

interface CategoryBadgeProps {
  category: Category | string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-bold uppercase tracking-wider",
        {
          "text-primary": category === "Cloud Credits",
          "text-blue-400": category === "AI Tools",
          "text-emerald-400": category === "Getting Started",
          "text-purple-400": category === "Best Practices",
          "text-red-400": category === "Security",
        },
        className
      )}
    >
      {category}
    </span>
  );
}
