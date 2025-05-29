// ViewSteps.jsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import StepsCarousel from "./StepsCarrousel"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function ViewSteps({ onBack }) {
  const [puzzles, setPuzzles] = useState([])
  const [isLoadingPuzzles, setIsLoadingPuzzles] = useState(true)

  const [hasMissingPieces, setHasMissingPieces] = useState(false)
  const [missingPieces, setMissingPieces] = useState("")
  const [startingPiece, setStartingPiece] = useState("")
  const [selectedPuzzle, setSelectedPuzzle] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [solutions, setSolutions] = useState([])

  // 1. Al montar, traemos la lista de puzzles
  useEffect(() => {
    fetch("http://localhost:5000/puzzles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPuzzles(data.puzzles)
      })
      .catch(console.error)
      .finally(() => setIsLoadingPuzzles(false))
  }, [])

  const handleViewSolution = async () => {
    setIsLoading(true)
    try {
      console.log("🛰️ Enviando request a backend para armar puzzle:");
      console.log("   Puzzle seleccionado:", selectedPuzzle);
      console.log("   Pieza inicial:", startingPiece);

      const res = await fetch(
        `http://localhost:5000/armar/${encodeURIComponent(selectedPuzzle)}/${encodeURIComponent(startingPiece)}`
      )
      const data = await res.json();
      console.log("📦 Respuesta recibida del backend:", data);

      if (data.success) {
        setSolutions(data.recorridos)
        setShowSteps(true)
      } else {
        alert("Error al generar la solución")
      }
    } catch (e) {
      console.error(e)
      alert("Falló la conexión al backend")
    } finally {
      setIsLoading(false)
    }
  }

  // Detalles del puzzle seleccionado
  const puzzleDetails = puzzles.find((p) => p.name === selectedPuzzle) || {}

  // Validación del formulario
  const isFormValid =
    selectedPuzzle &&
    startingPiece &&
    (!hasMissingPieces || missingPieces.trim() !== "")

  // 2. Si ya generamos pasos, mostramos el StepsCarousel
  if (showSteps) {
    const firstRoute = solutions[0] || {}
    return (
      <StepsCarousel
        puzzleName={puzzleDetails.name}
        pieceCount={puzzleDetails.pieces}
        puzzleType={puzzleDetails.type}
        // Usamos matches directamente del backend
        connections={firstRoute.pasos || []}
        hasMissingPieces={hasMissingPieces}
        missingPieces={missingPieces}
        startingPiece={startingPiece}
        onBack={onBack}
      />
    )
  }

  // 3. Formulario de configuración
  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al menú
          </Button>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            🎯 GENERAR GUÍA
          </h2>
          <div className="h-1 w-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Configura los parámetros para generar tu guía personalizada paso a paso
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-3xl font-bold">
              Configuración de la Guía
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Personaliza tu experiencia de armado
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Selección de puzzle */}
            <div className="space-y-3">
              <Label
                htmlFor="puzzle-select"
                className="text-white font-bold text-lg flex items-center gap-2"
              >
                <span className="text-2xl">🧩</span>
                Selecciona tu puzzle registrado
              </Label>
              <select
                id="puzzle-select"
                value={selectedPuzzle}
                onChange={(e) => setSelectedPuzzle(e.target.value)}
                disabled={isLoadingPuzzles}
                className="w-full bg-gray-800/50 border border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 text-lg py-3 px-4 rounded-xl"
              >
                <option value="">
                  {isLoadingPuzzles
                    ? "Cargando puzzles..."
                    : "Selecciona un puzzle..."}
                </option>
                {puzzles.map((p) => (
                  <option
                    key={p.name}
                    value={p.name}
                    className="bg-gray-800"
                  >
                    {p.name} - {p.pieces} piezas ({p.type})
                  </option>
                ))}
              </select>
              {selectedPuzzle && (
                <div className="mt-3 p-4 bg-blue-900/20 border border-blue-800/30 rounded-xl">
                  <p className="text-blue-300 font-medium">
                    📊 Puzzle seleccionado:{" "}
                    <span className="text-blue-400 font-bold">
                      {puzzleDetails.name}
                    </span>
                    <br />
                    🔢 Total de piezas:{" "}
                    <span className="text-blue-400 font-bold">
                      {puzzleDetails.pieces}
                    </span>
                    <br />
                    ⚙️ Tipo:{" "}
                    <span className="text-blue-400 font-bold">
                      {puzzleDetails.type}
                    </span>
                  </p>
                </div>
              )}
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
                <Label
                  htmlFor="missing-pieces"
                  className="text-white font-bold text-lg flex items-center gap-2"
                >
                  <span className="text-2xl">❌</span>
                  ¿Falta alguna pieza?
                </Label>
              </div>
              {hasMissingPieces && (
                <div className="space-y-2 ml-8">
                  <Label className="text-gray-300 font-medium">
                    ¿Qué pieza(s) faltan?
                  </Label>
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
              <Label
                htmlFor="starting-piece"
                className="text-white font-bold text-lg flex items-center gap-2"
              >
                <span className="text-2xl">🎯</span>
                ¿A partir de qué pieza quieres empezar?
              </Label>
              <Input
                id="starting-piece"
                placeholder="Ej: Pieza 1, esquina superior izquierda, etc."
                value={startingPiece}
                onChange={(e) => setStartingPiece(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-3 rounded-xl"
              />
            </div>
          </CardContent>

          <CardFooter className="pt-8">
            <Button
              onClick={handleViewSolution}
              disabled={isLoading || !isFormValid}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 text-xl rounded-xl shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  🔮 GENERANDO SOLUCIÓN...
                </>
              ) : (
                "🚀 VER SOLUCIÓN"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
