import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | BTTP",
};

export default function BlogPage() {
  return (
    <section className="px-6 pt-32 pb-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="mt-6 text-sm text-black/40">Content coming soon.</p>
      </div>
    </section>
  );
}
