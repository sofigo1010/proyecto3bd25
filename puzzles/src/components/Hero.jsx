"use client"

import { Button } from "./ui/button"
import Image from "next/image"

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("puzzle-form").scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/5 via-blue-600/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
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
            <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>

          <p className="text-2xl text-gray-300 leading-relaxed font-light">
            <span className="text-blue-400 font-bold text-3xl">¡REVOLUCIONA</span> la forma en que armas rompecabezas.
            <br />
            <span className="text-blue-300">Sistema inteligente paso a paso.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              size="lg"
              className="font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white border-0 px-12 py-6 text-xl rounded-2xl shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              onClick={scrollToForm}
            >
              🚀 EMPEZAR AHORA
            </Button>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-500"></div>
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Rompecabezas"
            fill
            className="object-contain relative z-10 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
