export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-black/60">
        © {new Date().getFullYear()} BTTP. All rights reserved.
      </div>
    </footer>
  );
}
