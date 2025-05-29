// StepsCarousel.jsx
"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Target,
  ArrowLeft,
} from "lucide-react"

export default function StepsCarousel({
  puzzleName,
  pieceCount,
  puzzleType,
  connections = [],
  hasMissingPieces,
  missingPieces,
  startingPiece,
  onBack,
}) {
  const [currentStep, setCurrentStep] = useState(0)

  // Construye la lista de pasos
  const steps = useMemo(() => {
    const list = []

    // Paso 0: punto de partida
    list.push({
      title: "🎯 Punto de partida",
      content: `Comienza con la pieza "${startingPiece}".${
        hasMissingPieces ? ` ⚠️ Te faltan: ${missingPieces}` : ""
      }`,
      tip: "Identifica y ubica tu pieza inicial antes de empezar.",
      icon: <Target className="h-6 w-6 text-blue-400" />,
    })

    // Pasos intermedios: uno por cada conexión
    connections.forEach((c, i) => {
      list.push({
        title: `🔗 Paso ${i + 1}`,
        content: `Une la pieza "${c.from}" con "${c.to}".`,
        sidefrom: c.sidefrom,
        sideto:   c.sideto,
        comment:  c.comment,
        tip:      c.comment || "Alinea bordes y patrones antes de encajar.",
        icon:     <CheckCircle className="h-6 w-6 text-green-400" />,
      })
    })

    // Paso final
    list.push({
      title: "🎉 ¡Puzzle completo!",
      content: `¡Has ensamblado tu rompecabezas "${puzzleName}" de ${pieceCount} piezas!`,
      tip: "Disfruta tu obra terminada o comparte una foto de tu logro.",
      icon: <CheckCircle className="h-6 w-6 text-yellow-400" />,
    })

    console.log("🛠️ steps array:", list)
    return list
  }, [
    puzzleName,
    pieceCount,
    startingPiece,
    hasMissingPieces,
    missingPieces,
    connections,
  ])

  // Loguea el paso actual al cambiar
  useEffect(() => {
    console.log(`🛠️ currentStep=${currentStep}`, steps[currentStep])
  }, [currentStep, steps])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    }
  }
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen relative overflow-hidden">
      {/* Fondos animados */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Botón volver */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al menú
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            🎯 GUÍA PASO A PASO
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-300 text-xl">
            Paso{" "}
            <span className="text-blue-400 font-bold text-2xl">
              {currentStep + 1}
            </span>{" "}
            de{" "}
            <span className="text-blue-400 font-bold text-2xl">
              {steps.length}
            </span>
          </p>
        </div>

        {/* Tarjeta de paso */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="flex items-center gap-4 pb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
              {step.icon}
            </div>
            <CardTitle className="text-white text-3xl font-bold">
              {step.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contenido principal */}
            <p className="text-gray-300 text-xl leading-relaxed">
              {step.content || "(sin contenido)"}
            </p>

            {/* Lados (sidefrom / sideto) */}
            {step.sidefrom && step.sideto && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
                <p className="text-blue-200">
                  🔄 Lado desde:{" "}
                  <span className="font-semibold">{step.sidefrom}</span>, lado hasta:{" "}
                  <span className="font-semibold">{step.sideto}</span>
                </p>
              </div>
            )}

            {/* Comentario específico */}
            {step.comment && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
                <p className="text-yellow-300 font-medium">
                  💬 {step.comment}
                </p>
              </div>
            )}

            {/* Tip general */}
            <div className="bg-gradient-to-r from-blue-900/30 via-blue-800/30 to-blue-900/30 border border-blue-700/50 rounded-2xl p-6">
              <p className="text-blue-300 font-bold text-lg">{step.tip}</p>
            </div>

            {/* Navegación de pasos */}
            <div className="flex justify-between items-center pt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-xl font-medium"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Anterior
              </Button>

              <div className="flex gap-3">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                        : i < currentStep
                        ? "bg-blue-700"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/25"
              >
                {currentStep === steps.length - 1 ? (
                  <>🏆 Completado</>
                ) : (
                  <>
                    Siguiente
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
