"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import RegisterPuzzle from "./RegisterPuzzle"
import ViewSteps from "./ViewSteps"
import { PlusCircle, Play } from "lucide-react"

export default function MainMenu() {
  const [currentView, setCurrentView] = useState("menu") 

  if (currentView === "register") {
    return <RegisterPuzzle onBack={() => setCurrentView("menu")} />
  }

  if (currentView === "view") {
    return <ViewSteps onBack={() => setCurrentView("menu")} />
  }

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/5 via-blue-600/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              DOMINA
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">TUS</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              PUZZLES
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-8"></div>
          <p className="text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
            <span className="text-blue-400 font-bold text-3xl">¡REVOLUCIONA</span> la forma en que armas rompecabezas.
            <br />
            <span className="text-blue-300">Sistema inteligente paso a paso.</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Registrar Puzzle */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/10 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                <PlusCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Registrar Puzzle</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Crea un nuevo registro de tu rompecabezas con todas sus conexiones y características.
              </p>
            </div>
            <Button
              onClick={() => setCurrentView("register")}
              className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 text-xl rounded-2xl shadow-2xl shadow-blue-500/25"
            >
              🧩 REGISTRAR PUZZLE
            </Button>
          </div>

          {/* Ver Paso a Paso */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 border-blue-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-500/10 transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/25">
                <Play className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Ver Paso a Paso</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Genera una guía personalizada para armar tu rompecabezas de manera organizada.
              </p>
            </div>
            <Button
              onClick={() => setCurrentView("view")}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-4 text-xl rounded-2xl shadow-2xl shadow-blue-600/25"
            >
              🎯 VER SOLUCIÓN
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
