import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CardList } from "@/components/CardList"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          <Routes>
            <Route path="/" element={<p>홈 페이지입니다.</p>} />
            <Route path="/users" element={<CardList />} />
            <Route path="/about" element={<p>About 페이지입니다.</p>} />
            <Route path="/contact" element={<p>Contact 페이지입니다.</p>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
