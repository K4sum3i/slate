import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <div>
          <Link href="/auth">Login</Link>
        </div>
      </section>
    </main>
  );
}
