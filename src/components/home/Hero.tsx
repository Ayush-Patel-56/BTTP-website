export default function Hero() {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden border-b border-black/10 bg-[#0B1220] px-6 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/hero-boat.mp4"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center">
        <h1 className="hero-reveal text-balance text-5xl leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl">
          You Wouldn&apos;t Ignore ₹50,000 In Your Bank Account
          <br className="hidden sm:block" /> Why Ignore It In Loyalty Points?
        </h1>
        <p className="hero-reveal hero-reveal-delay-1 mt-8 text-2xl font-medium text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-3xl">
          You Earned The Points Now Make Them Count
        </p>
        <p className="hero-reveal hero-reveal-delay-1 mt-5 max-w-2xl text-lg leading-relaxed text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:text-xl">
          Back to the Points turns scattered credit card rewards, miles and
          hotel points into real value and experiences
        </p>
      </div>
    </section>
  );
}
