interface SectionPlaceholderProps {
  id?: string;
  title: string;
  description?: string;
}

export default function SectionPlaceholder({
  id,
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <section id={id} className="border-b border-black/10 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-black/60">{description}</p>
        )}
        <p className="mt-6 text-sm text-black/40">Content coming soon.</p>
      </div>
    </section>
  );
}
