export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-6xl font-bold tracking-tight">Unbank</h1>
        <p className="text-xl text-zinc-500 max-w-md">
          Financial services for the future. Efficient, transparent, and secure.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="rounded-full bg-foreground text-background px-8 py-3 font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="rounded-full border border-zinc-200 dark:border-zinc-800 px-8 py-3 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Learn More
          </button>
        </div>
      </main>
      <footer className="absolute bottom-8 text-sm text-zinc-400">
        © {new Date().getFullYear()} Unbank. All rights reserved.
      </footer>
    </div>
  );
}
