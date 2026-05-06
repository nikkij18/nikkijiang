import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8 pt-24 pb-12">

      {/* Big split typography — floats in front of photo so words are always legible */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-8 pointer-events-none select-none">
        <span
          className="font-black uppercase leading-none text-neutral-900"
          style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
        >Data</span>
        <span
          className="font-black uppercase leading-none text-neutral-900"
          style={{ fontSize: "clamp(72px, 10vw, 160px)" }}
        >Stories</span>
      </div>

      {/* Center column: name + photo — absolutely centered to avoid flex/padding drift */}
      <div className="absolute z-10 flex flex-col items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

        {/* Name — top left of the photo */}
        <div className="w-full max-w-xs self-center mb-2 pl-1">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
            Nikki Jiang
          </p>
        </div>

        {/* Photo card */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl"
          style={{ width: "clamp(240px, 28vw, 380px)", aspectRatio: "3/4" }}
        >
          <Image
            src="/Headshot.png"
            alt="Nikki Jiang"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Bio — bottom right */}
      <p
        className="absolute bottom-16 right-10 text-sm text-neutral-500 text-right leading-relaxed max-w-xs z-10"
        style={{ fontSize: "clamp(12px, 1vw, 15px)" }}
      >
        I make complex health systems legible {"—"} through research, design, and interactive data.
      </p>

    </section>
  );
}
