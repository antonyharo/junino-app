import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-15">
      <main className="grid gap-8">
        <h1 className="text-2xl font-bold text-center">Festa Junina do 3a! 🎉🥳</h1>
        <div className="grid gap-3 place-items-center">
          <Link href="/games/palhaco">
            <Button variant="outline">Novo jogo do palhaço 🤡</Button>
          </Link>

          <Link href="/games/burro">
            <Button variant="outline">Novo jogo do burro 🐴</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
