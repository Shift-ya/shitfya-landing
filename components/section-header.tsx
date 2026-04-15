interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className = 'mb-20 text-center',
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
        {badge}
      </p>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
