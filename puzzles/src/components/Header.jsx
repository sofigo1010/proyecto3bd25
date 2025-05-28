import Link from "next/link"
import { Puzzle } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-blue-900/30 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Puzzle className="h-10 w-10 text-blue-400 animate-pulse" />
            <div className="absolute inset-0 h-10 w-10 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
          <span className="font-bold text-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            PuzzleConnect
          </span>
        </Link>
      </div>
    </header>
  )
}
