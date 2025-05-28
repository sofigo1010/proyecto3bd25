"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function RegisterPuzzle({ onBack }) {
  const [puzzleName, setPuzzleName] = useState("")
  const [pieceCount, setPieceCount] = useState("")
  const [isRegular, setIsRegular] = useState(true)
  const [connections, setConnections] = useState([])
  const [piece1, setPiece1] = useState("")
  const [piece2, setPiece2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleAddConnection = () => {
    if (piece1 && piece2) {
      setConnections([...connections, { from: piece1, to: piece2 }])
      setPiece1("")
      setPiece2("")
    }
  }

  const handleRegisterPuzzle = async () => {
    setIsLoading(true)
    // Simular registro
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsRegistered(true)
  }

  const isFormValid = puzzleName && pieceCount && connections.length > 0

  if (isRegistered) {
    return (
      <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/25">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              ¡PUZZLE REGISTRADO!
            </h2>
            <p className="text-gray-300 text-xl mb-8">
              Tu puzzle "<span className="text-blue-400 font-bold">{puzzleName}</span>" ha sido registrado exitosamente
              con <span className="text-blue-400 font-bold">{connections.length}</span> conexiones.
            </p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 text-xl rounded-2xl"
            >
              🏠 VOLVER AL MENÚ
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al menú
          </Button>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            🧩 REGISTRAR PUZZLE
          </h2>
          <div className="h-1 w-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Completa toda la información de tu rompecabezas para crear un registro completo
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-white text-3xl font-bold">Información del Puzzle</CardTitle>
            <CardDescription className="text-gray-400 text-lg">Todos los campos son obligatorios</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Nombre del puzzle */}
            <div className="space-y-3">
              <Label htmlFor="puzzle-name" className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Nombre del puzzle
              </Label>
              <Input
                id="puzzle-name"
                placeholder="Ej: Paisaje de montaña"
                value={puzzleName}
                onChange={(e) => setPuzzleName(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg py-3 rounded-xl"
              />
            </div>

            {/* Total de piezas */}
            <div className="space-y-3">
              <Label htmlFor="piece-count" className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🔢</span>
                Número total de piezas
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

            {/* Tipo de puzzle */}
            <div className="space-y-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
              <Label className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                Tipo de puzzle
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="regular"
                    checked={isRegular}
                    onCheckedChange={() => setIsRegular(true)}
                    className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="regular" className="text-white font-medium">
                    🔲 Regular (piezas estándar)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="irregular"
                    checked={!isRegular}
                    onCheckedChange={() => setIsRegular(false)}
                    className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="irregular" className="text-white font-medium">
                    🔀 Irregular (formas especiales)
                  </Label>
                </div>
              </div>
            </div>

            {/* Conexiones */}
            <div className="space-y-4 p-6 bg-blue-900/10 rounded-xl border border-blue-800/30">
              <Label className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                Registrar conexiones entre piezas
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
                  disabled={!piece1 || !piece2}
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
              onClick={handleRegisterPuzzle}
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />🔮 REGISTRANDO PUZZLE...
                </>
              ) : (
                "🚀 REGISTRAR PUZZLE"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
