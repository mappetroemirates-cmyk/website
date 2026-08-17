import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "text-sm font-bold uppercase tracking-widest",
          light ? "text-accent-300" : "text-accent-600"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-neutral-900"
        )}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-7",
            light ? "text-primary-100" : "text-neutral-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
