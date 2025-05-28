"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import StepsCarousel from "./StepsCarousel"
import { Loader2, Sparkles } from "lucide-react"

export default function PuzzleForm() {
  const [pieceCount, setPieceCount] = useState("")
  const [connections, setConnections] = useState([])
  const [piece1, setPiece1] = useState("")
  const [piece2, setPiece2] = useState("")
  const [hasMissingPieces, setHasMissingPieces] = useState(false)
  const [missingPieces, setMissingPieces] = useState("")
  const [startingPiece, setStartingPiece] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSteps, setShowSteps] = useState(false)

  const handleAddConnection = () => {
    if (piece1 && piece2) {
      setConnections([...connections, { from: piece1, to: piece2 }])
      setPiece1("")
      setPiece2("")
    }
  }

  const handleSavePuzzle = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
    setShowSteps(true)
  }

  if (showSteps) {
    return (
      <StepsCarousel
        pieceCount={pieceCount}
        connections={connections}
        hasMissingPieces={hasMissingPieces}
        missingPieces={missingPieces}
        startingPiece={startingPiece}
      />
    )
  }

  return (
    <section
      id="puzzle-form"
      className="py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              CONFIGURA TU PUZZLE
            </h2>
            <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
          </div>
          <div className="h-1 w-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Proporciona la información de tu rompecabezas para generar tu
            <span className="text-blue-400 font-bold"> guía personalizada paso a paso</span>
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-3xl font-bold flex items-center justify-center gap-3">
              <span className="text-4xl">🧩</span>
              Información del Puzzle
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Completa todos los campos para obtener la mejor experiencia
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Total de piezas */}
            <div className="space-y-3">
              <Label htmlFor="piece-count" className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🔢</span>
                Número TOTAL de piezas
              </Label>
              <Input
                id="piece-count"
                type="number"
                placeholder="Ej: 1000"
                value={pieceCount}
                onChange={(e) => setPieceCount(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-3 rounded-xl"
              />
            </div>

            {/* Piezas faltantes */}
            <div className="space-y-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="missing-pieces"
                  checked={hasMissingPieces}
                  onCheckedChange={setHasMissingPieces}
                  className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="missing-pieces" className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  ¿Falta alguna pieza?
                </Label>
              </div>

              {hasMissingPieces && (
                <div className="space-y-2 ml-8">
                  <Label className="text-gray-300 font-medium">¿Qué pieza(s) faltan?</Label>
                  <Input
                    placeholder="Ej: Pieza 45, Pieza 123, etc."
                    value={missingPieces}
                    onChange={(e) => setMissingPieces(e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Pieza de inicio */}
            <div className="space-y-3">
              <Label htmlFor="starting-piece" className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                ¿A partir de qué pieza empezar?
              </Label>
              <Input
                id="starting-piece"
                placeholder="Ej: Pieza 1, esquina superior izquierda, etc."
                value={startingPiece}
                onChange={(e) => setStartingPiece(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-3 rounded-xl"
              />
            </div>

            {/* Conexiones */}
            <div className="space-y-4 p-6 bg-blue-900/10 rounded-xl border border-blue-800/30">
              <Label className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Registrar conexiones entre piezas (opcional)
              </Label>
              <div className="flex gap-3">
                <Input
                  placeholder="Pieza #1"
                  value={piece1}
                  onChange={(e) => setPiece1(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-xl"
                />
                <Input
                  placeholder="Pieza #2"
                  value={piece2}
                  onChange={(e) => setPiece2(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={handleAddConnection}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium"
                >
                  ➕ Añadir
                </Button>
              </div>
            </div>

            {connections.length > 0 && (
              <div className="border border-gray-700 rounded-xl p-6 bg-gray-800/30">
                <h4 className="font-bold mb-4 text-white text-lg flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Conexiones registradas ({connections.length}):
                </h4>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {connections.map((connection, index) => (
                    <li key={index} className="text-gray-300 bg-gray-700/30 p-2 rounded-lg">
                      🧩 Pieza <span className="text-blue-400 font-bold">{connection.from}</span> ↔ Pieza{" "}
                      <span className="text-blue-400 font-bold">{connection.to}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-8">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 text-xl rounded-xl shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              onClick={handleSavePuzzle}
              disabled={isLoading || !pieceCount || !startingPiece}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />🔮 GENERANDO TU GUÍA MÁGICA...
                </>
              ) : (
                "🚀 GENERAR GUÍA PASO A PASO"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
