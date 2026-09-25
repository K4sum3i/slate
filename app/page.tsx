import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-[calc(100vh-4rem)]">
      <section className="flex flex-col items-center px-6 pt-16 text-center md:pt-24 lg:pt-32">
        <div>
          <Link href="/auth">Login</Link>
        </div>
      </section>
    </main>
  );
}
