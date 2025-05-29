// RegisterPuzzle.jsx
"use client"

import { useState } from "react"
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
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function RegisterPuzzle({ onBack }) {
  const [puzzleName, setPuzzleName] = useState("")
  const [theme, setTheme] = useState("")
  const [pieceCount, setPieceCount] = useState("")
  const [isRegular, setIsRegular] = useState(true)

  const [pieceInput, setPieceInput] = useState("")
  const [pieces, setPieces] = useState([])

  const [matchFrom, setMatchFrom] = useState("")
  const [matchTo, setMatchTo] = useState("")
  const [sideFrom, setSideFrom] = useState("")
  const [sideTo, setSideTo] = useState("")
  const [comment, setComment] = useState("")
  const [matches, setMatches] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const API_BASE = "http://127.0.0.1:5000"

  const addPiece = () => {
    if (!pieceInput.trim()) return
    setPieces((prev) => [...prev, pieceInput.trim()])
    setPieceInput("")
  }

  const addMatch = () => {
    if (!matchFrom || !matchTo || !sideFrom || !sideTo) return
    setMatches((prev) => [
      ...prev,
      { from: matchFrom, to: matchTo, sidefrom: sideFrom, sideto: sideTo, comment },
    ])
    setMatchFrom("")
    setMatchTo("")
    setSideFrom("")
    setSideTo("")
    setComment("")
  }

  const handleRegisterPuzzle = async () => {
    setIsLoading(true)
    try {
      // 1. Crear el puzzle
      const resPuzzle = await fetch(`${API_BASE}/puzzle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: puzzleName,
          theme,
          type: isRegular ? "Regular" : "Irregular",
          pieces: pieces.length,
        }),
      })
      const jp = await resPuzzle.json()
      if (!jp.success) throw new Error(jp.error || "Error creando puzzle")

      // 2. Crear cada pieza
      for (let label of pieces) {
        const resPi = await fetch(`${API_BASE}/pieza`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ puzzle: puzzleName, label }),
        })
        const jpi = await resPi.json()
        if (!jpi.success) throw new Error(jpi.error || "Error creando pieza")
      }

      // 3. Crear cada relación MATCH
      for (let m of matches) {
        const resM = await fetch(`${API_BASE}/match`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(m),
        })
        const jm = await resM.json()
        if (!jm.success) throw new Error(jm.error || "Error creando relación")
      }

      setIsRegistered(true)
    } catch (e) {
      console.error(e)
      alert(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const formComplete =
    puzzleName &&
    pieceCount &&
    pieces.length === Number(pieceCount) &&
    matches.length > 0

  if (isRegistered) {
    return (
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/25">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              ¡PUZZLE REGISTRADO!
            </h2>
            <p className="text-gray-300 mb-8">
              "{puzzleName}" con {pieces.length} piezas y{" "}
              {matches.length} relaciones.
            </p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg"
            >
              🏠 Volver al menú
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2" /> Volver al menú
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            🧩 Registrar Puzzle
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Completa todos los campos, añade piezas y relaciones para registrar tu puzzle.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-white text-3xl font-bold">
              Información del Puzzle
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Todos los campos son obligatorios
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nombre y Tema */}
            <div className="space-y-4">
              <Label className="text-white font-bold">Nombre del puzzle</Label>
              <Input
                placeholder="Ej: Paisaje de montaña"
                value={puzzleName}
                onChange={(e) => setPuzzleName(e.target.value)}
                className="bg-gray-800/50 text-white"
              />
              <Label className="text-white font-bold">Tema</Label>
              <Input
                placeholder="Ej: Naturaleza"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-gray-800/50 text-white"
              />
            </div>

            {/* Cantidad y Tipo */}
            <div className="space-y-4">
              <Label className="text-white font-bold">Número de piezas</Label>
              <Input
                type="number"
                placeholder="Ej: 1000"
                value={pieceCount}
                onChange={(e) => setPieceCount(e.target.value)}
                className="bg-gray-800/50 text-white"
              />
              <Label className="text-white font-bold">Tipo de puzzle</Label>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="regular"
                  checked={isRegular}
                  onCheckedChange={() => setIsRegular(true)}
                  className="border-gray-600 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="regular" className="text-white">
                  Regular
                </Label>
                <Checkbox
                  id="irregular"
                  checked={!isRegular}
                  onCheckedChange={() => setIsRegular(false)}
                  className="border-gray-600 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="irregular" className="text-white">
                  Irregular
                </Label>
              </div>
            </div>

            {/* Añadir Piezas */}
            <div className="space-y-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
              <Label className="text-white font-bold flex items-center gap-2">
                <span className="text-2xl">➕</span> Añadir pieza
              </Label>
              <div className="flex gap-3">
                <Input
                  placeholder="Etiqueta de pieza"
                  value={pieceInput}
                  onChange={(e) => setPieceInput(e.target.value)}
                  className="bg-gray-800/50 text-white"
                />
                <Button
                  onClick={addPiece}
                  disabled={!pieceInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  Añadir
                </Button>
              </div>
              {pieces.length > 0 && (
                <p className="text-gray-300">
                  Piezas: <span className="font-medium">{pieces.join(", ")}</span>
                </p>
              )}
            </div>

            {/* Añadir Relaciones */}
            <div className="space-y-4 p-6 bg-blue-900/10 rounded-xl border border-blue-800/30">
              <Label className="text-white font-bold flex items-center gap-2">
                <span className="text-2xl">🔗</span> Añadir relación MATCH
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Desde (label)"
                  value={matchFrom}
                  onChange={(e) => setMatchFrom(e.target.value)}
                  className="bg-gray-800/50 text-white"
                />
                <Input
                  placeholder="Hasta (label)"
                  value={matchTo}
                  onChange={(e) => setMatchTo(e.target.value)}
                  className="bg-gray-800/50 text-white"
                />
                <Input
                  placeholder="Lado desde"
                  value={sideFrom}
                  onChange={(e) => setSideFrom(e.target.value)}
                  className="bg-gray-800/50 text-white"
                />
                <Input
                  placeholder="Lado hasta"
                  value={sideTo}
                  onChange={(e) => setSideTo(e.target.value)}
                  className="bg-gray-800/50 text-white"
                />
                <Input
                  placeholder="Comentario"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-800/50 text-white col-span-2"
                />
              </div>
              <Button
                onClick={addMatch}
                disabled={!matchFrom || !matchTo || !sideFrom || !sideTo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Añadir
              </Button>
              {matches.length > 0 && (
                <ul className="text-gray-300 space-y-1 mt-2">
                  {matches.map((m, i) => (
                    <li key={i} className="bg-gray-700/30 p-2 rounded">
                      {m.from} → {m.to} [{m.sidefrom}→{m.sideto}] "{m.comment}"
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            <Button
              onClick={handleRegisterPuzzle}
              disabled={isLoading || !formComplete}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading ? "Registrando..." : "🚀 Registrar Puzzle"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
