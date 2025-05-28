import { Puzzle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-900/30 py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Puzzle className="h-12 w-12 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 bg-blue-400/20 rounded-full blur-xl"></div>
            </div>
            <span className="font-black text-4xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              PuzzleConnect
            </span>
          </div>

          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            La revolución en el armado de rompecabezas.
            <span className="text-blue-400 font-bold"> Inteligente. Organizado. Efectivo.</span>
          </p>

          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-8"></div>
        </div>

        <div className="border-t border-blue-900/30 pt-8 text-center text-gray-400">
          <p className="text-lg">
            © {new Date().getFullYear()} PuzzleConnect.
            <span className="text-blue-400 font-medium"> Creado para los amantes de los puzzles.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
