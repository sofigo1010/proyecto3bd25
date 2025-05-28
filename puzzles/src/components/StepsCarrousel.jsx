"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, Target, ArrowLeft } from "lucide-react"

export default function StepsCarousel({
  puzzleName,
  pieceCount,
  puzzleType,
  connections,
  hasMissingPieces,
  missingPieces,
  startingPiece,
  onBack,
}) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "🎯 Punto de partida",
      content: `Perfecto! Comenzarás desde: "${startingPiece}". ${hasMissingPieces ? `⚠️ IMPORTANTE: Te faltan las siguientes piezas: ${missingPieces}` : "✅ Tienes todas las piezas completas."}`,
      tip: "💡 Siempre identifica tu punto de partida antes de comenzar",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "📊 Análisis del puzzle",
      content: `Tu rompecabezas "${puzzleName}" tiene ${pieceCount} piezas en total y es de tipo ${puzzleType}. ${hasMissingPieces ? `Con las piezas faltantes, trabajarás con aproximadamente ${Number.parseInt(pieceCount) - (missingPieces ? missingPieces.split(",").length : 0)} piezas.` : "Tienes el set completo para trabajar."}`,
      tip: `🧮 Conocer el total y tipo te ayuda a planificar mejor - Los puzzles ${puzzleType.toLowerCase()}s tienen ${puzzleType === "Regular" ? "formas estándar" : "formas especiales"}`,
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🔍 Preparación inicial",
      content: `Separa todas las piezas de borde y esquinas. ${hasMissingPieces ? "Ten en cuenta las piezas faltantes al buscar el marco." : "Busca las 4 esquinas y todos los bordes rectos."}`,
      tip: "🔲 Las piezas de borde tienen al menos un lado completamente recto",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🎨 Organización por colores",
      content:
        "Agrupa las piezas por colores similares o patrones. Esto te ayudará a identificar secciones específicas del puzzle.",
      tip: "🥤 Usa recipientes pequeños o bandejas para cada grupo de color",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🔗 Conexiones específicas",
      content:
        connections && connections.length > 0
          ? `Tienes ${connections.length} conexiones registradas. Úsalas como guía prioritaria para armar secciones específicas rápidamente.`
          : "No hay conexiones específicas registradas, pero puedes seguir con el método tradicional de colores y patrones.",
      tip:
        connections && connections.length > 0
          ? "🎯 Las conexiones registradas son tu mapa del tesoro"
          : "🔍 Observa patrones y texturas para crear tus propias conexiones",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🏗️ Construcción del marco",
      content: `Comienza armando todo el borde del rompecabezas. Inicia desde "${startingPiece}" y expándete desde ahí.`,
      tip: "📐 El marco es tu fundación - tómate tu tiempo para hacerlo bien",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🧩 Completar secciones internas",
      content:
        "Trabaja en secciones pequeñas dentro del marco. Conecta las áreas que ya identificaste por color y patrón.",
      tip: "🎯 Es más eficiente trabajar de afuera hacia adentro",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "🎉 ¡MISIÓN CUMPLIDA!",
      content: `¡Felicitaciones! Has completado tu rompecabezas "${puzzleName}" de ${pieceCount} piezas siguiendo una metodología súper organizada. ¡Eres un maestro de los puzzles!`,
      tip: "📸 ¡Toma una foto épica de tu logro y compártela!",
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            🎯 GUÍA PASO A PASO
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl">
            Paso <span className="text-blue-400 font-bold text-2xl">{currentStep + 1}</span> de{" "}
            <span className="text-blue-400 font-bold text-2xl">{steps.length}</span>
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
          <CardHeader className="pb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                {currentStep === steps.length - 1 ? (
                  <span className="text-3xl">🏆</span>
                ) : (
                  <span className="text-white font-bold text-xl">{currentStep + 1}</span>
                )}
              </div>
              <div>
                <CardTitle className="text-white text-3xl font-bold">{steps[currentStep].title}</CardTitle>
                {hasMissingPieces && currentStep === 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-yellow-400 font-medium">Piezas faltantes detectadas</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <p className="text-gray-300 text-xl leading-relaxed font-medium">{steps[currentStep].content}</p>

            <div className="bg-gradient-to-r from-blue-900/30 via-blue-800/30 to-blue-900/30 border border-blue-700/50 rounded-2xl p-6">
              <p className="text-blue-300 font-bold text-lg">{steps[currentStep].tip}</p>
            </div>

            {currentStep === 4 && connections && connections.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 text-xl flex items-center gap-2">
                  🔗 Tus conexiones prioritarias:
                </h4>
                <div className="grid gap-3">
                  {connections.slice(0, 5).map((connection, index) => (
                    <div key={index} className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
                      <span className="text-blue-300 font-medium">
                        🧩 Pieza <span className="text-blue-400 font-bold">{connection.from}</span> ↔ Pieza{" "}
                        <span className="text-blue-400 font-bold">{connection.to}</span>
                      </span>
                    </div>
                  ))}
                  {connections.length > 5 && (
                    <div className="text-gray-400 text-center py-2">... y {connections.length - 5} conexiones más</div>
                  )}
                </div>
              </div>
            )}

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
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                        : index < currentStep
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
