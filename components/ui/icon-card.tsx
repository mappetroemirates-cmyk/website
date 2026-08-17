import type { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function IconCard({ icon: Icon, title, description }: IconCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
      )}
    </div>
  );
}
