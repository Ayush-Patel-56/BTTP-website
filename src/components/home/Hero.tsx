export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-b border-black/10 px-6 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/hero-boat.mp4"
      />
      <div className="absolute inset-0 bg-white/2" />
      <div className="relative mx-auto max-w-4xl">
        <h1 className="hero-reveal text-5xl font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl">
          Stop losing rewards you already earned
        </h1>
        <p className="hero-reveal hero-reveal-delay-1 mt-4 text-xl text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-2xl">
          Never lose a point, miss a perk, or swipe the wrong card again
        </p>
      </div>
    </section>
  );
}
