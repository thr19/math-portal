import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Navbar from '../components/navbar.jsx'
import Hero from '../components/hero.jsx'
import Home from '../pages/home.jsx'
import Books from '../pages/books.jsx'
import Wiki from '../pages/wiki.jsx'
import Blog from '../pages/blog.jsx'
import Forum from '../pages/forum.jsx'
import About from '../pages/about.jsx'
import Contribute from '../pages/contribute.jsx'
import Contact from '../pages/contact.jsx'
import Login from '../pages/login.jsx'
import Signup from '../pages/signup.jsx'
import Profile from '../pages/profile.jsx'
import Footer from '../components/footer.jsx'
import { AuthProvider } from './AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
