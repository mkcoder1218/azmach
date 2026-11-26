export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="mx-auto w-full max-w-5xl">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Ethiopian roots. Global ambition.
        </p>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl lg:text-9xl">
          <span className="block text-red-700">Build Today.</span>
          <span className="block text-neutral-950">Lead Tomorrow.</span>
        </h1>
        <div className="mt-12 h-px w-full bg-neutral-200" />
        <div className="mt-6 grid grid-cols-2 gap-6 text-sm font-bold uppercase tracking-widest sm:grid-cols-4">
          <span>Build</span>
          <span>Innovate</span>
          <span>Lead</span>
          <span>Elevate</span>
        </div>
      </section>
    </main>
  );
}
