import Header from "../components/Header"
import MainMenu from "../components/MainMenu"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-grow">
        <MainMenu />
      </main>
      <Footer />
    </div>
  )
}
