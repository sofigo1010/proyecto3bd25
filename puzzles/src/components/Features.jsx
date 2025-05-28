import { CheckCircle, Puzzle, Share2, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Puzzle className="h-8 w-8 text-primary" />,
      title: "Organización de piezas",
      description: "Registra todas las piezas de tu rompecabezas y sus conexiones para facilitar su armado.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Búsqueda rápida",
      description: "Encuentra rápidamente qué piezas conectan con la que tienes en la mano.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Seguimiento de progreso",
      description: "Lleva un registro del avance de tu rompecabezas y las piezas que ya has conectado.",
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Comparte con amigos",
      description: "Comparte tu progreso y colabora con amigos para armar rompecabezas complejos.",
    },
  ]

  return (
    <section id="features" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Características principales</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo nuestra aplicación te ayuda a organizar y armar tus rompecabezas de manera más eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
