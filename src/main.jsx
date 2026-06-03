import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import Navbar from '../components/navbar.jsx'
import Hero from '../components/hero.jsx'
import Home from '../pages/home.jsx'
import Footer from '../components/footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* TODO: enable router later
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />
          <Route path="/wiki" element={<Home />} />
          <Route path="/blog" element={<Home />} />
          <Route path="/forum" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      */}
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
